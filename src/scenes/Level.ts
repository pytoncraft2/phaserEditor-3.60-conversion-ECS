// You can write more code here
import { createWorld, IWorld, pipe } from "bitecs";
import { createMatterPhysicsSyncSystem, createMatterPhysicsSystem, createMatterSpriteSystem, createMatterStaticSpriteSystem } from "../systems/Matter";
import { createPlayerSystem } from "../systems/PlayerSystem";
import { createSteeringSystem } from "../systems/SteerSystem";
import { TextureKeys } from "../types/texture";
import * as Phaser from "phaser";
import Player from "../prefabs/Player";
import Bullet from "../prefabs/Bullet";

/* START OF COMPILED CODE */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.world = createWorld()
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// text
		const text = this.add.text(400, 436, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "Press <- / -> to turn while holding\nUP/ DOWN";
		text.setStyle({ "align": "center", "fontFamily": "Arial", "fontSize": "3em" });

		// player
		const player = new Player(this, 399, 280);
		this.add.existing(player);

		// bullet
		const bullet = new Bullet(this, 496, 186);
		this.add.existing(bullet);

		this.player = player;

		this.events.emit("scene-awake");
	}

	private player!: Player;

	/* START-USER-CODE */
	init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()

		const onAfterUpdate = () => {
			if (!this.afterPhysicsPipeline || !this.world)
			{
				return
			}

			this.afterPhysicsPipeline(this.world)
		}

		this.matter.world.on(Phaser.Physics.Matter.Events.AFTER_UPDATE, onAfterUpdate)

		this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
			this.matter.world.off(Phaser.Physics.Matter.Events.AFTER_UPDATE, onAfterUpdate)
		})
	}

	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

	private world?: IWorld
	private pipeline?: (world: IWorld) => void
	private afterPhysicsPipeline?: (world: IWorld) => void

	// Write your code here
	create() {

		this.editorCreate();

		this.initEnities()

		// create MatterSpriteSystem
		this.pipeline = pipe(
			createMatterSpriteSystem(this.matter, TextureKeys),
			createMatterStaticSpriteSystem(),
			createPlayerSystem(this.cursors),
			createSteeringSystem(5),
			createMatterPhysicsSystem()
		)

		this.afterPhysicsPipeline = pipe(
			createMatterPhysicsSyncSystem()
		)

	}

	initEnities()
	{
		if(this.player)
		{
			this.player.emit('ecs-world', this.world)
		}
	}

	update(t: number, dt: number) {
		if (!this.world || !this.pipeline)
		{
			return
		}

		this.pipeline(this.world)
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here