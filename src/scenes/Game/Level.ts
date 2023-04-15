// You can write more code here
import * as Phaser from 'phaser'
import {
	createWorld,
	addEntity,
	addComponent,
	pipe
} from 'bitecs'

import type {
	IWorld,
	System
} from 'bitecs'

import Player from "../../prefabs/Player"
import Bullet from "../../prefabs/Bullet"
import Position from '../../ecs-comps/Position'
import Velocity from '../../ecs-comps/Velocity'
import Rotation from '../../ecs-comps/Rotation'
// import Player from '../../ecs-comps/Player'
import CPU from '../../ecs-comps/CPU'
import Input from '../../ecs-comps/Input'

import createMovementSystem from '../../systems/movement'
import createPlayerSystem from '../../systems/player'
import createCPUSystem from '../../systems/cpu'
import { createArcadeSpriteStaticSystem, createArcadeSpriteSystem } from '../../systems/sprite'
import { ArcadeSprite, ArcadeSpriteStatic } from '../../ecs-comps/ArcadeSprite'
import Alpha from '../../ecs-comps/Alpha'
import { TextureKeys } from '../../types/texture'

// enum Textures
// {
// 	TankBlue = 0,
// 	TankGreen = 1,
// 	TankRed = 2,
// 	Toile = 3
// }

// const TextureKeys = [
// 	'tank-blue',
// 	'tank-green',
// 	'tank-red',
// 	'toile'
// ]
/* START OF COMPILED CODE */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
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

		// platformes
		const platformes = this.add.layer();

		// platforme
		const platforme = this.add.rectangle(459, 541, 128, 128);
		platforme.scaleX = 3.7680520591373106;
		platforme.scaleY = 0.21455732556873675;
		platforme.isFilled = true;
		platforme.fillColor = 6095876;
		platformes.add(platforme);

		this.player = player;
		this.platformes = platformes;

		this.events.emit("scene-awake");
	}

	private player!: Player;
	public platformes!: Phaser.GameObjects.Layer;

	/* START-USER-CODE */

	// Write your code here
	init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()

	}

	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

	private world?: IWorld
	private pipeline?: (world: IWorld) => void
	private afterPhysicsPipeline?: (world: IWorld) => void

	// Write your code here
	create() {

		this.editorCreate();
		// this.matter.add.gameObject(this.platforme, {isStatic: true});

		this.initEnities()

		const spriteGroup = this.physics.add.group()
		// const spriteStaticGroup = this.physics.add.staticGroup()

		// this.physics.add.collider(spriteGroup, spriteStaticGroup)
		// this.physics.add.collider(spriteGroup, spriteGroup)
		// create MatterSpriteSystem
		this.pipeline = pipe(
			createArcadeSpriteSystem(spriteGroup, TextureKeys),
			// createArcadeSpriteStaticSystem(spriteStaticGroup, TextureKeys),
			createPlayerSystem(this.cursors),
			createCPUSystem(this),
			createMovementSystem()
		)

		// this.afterPhysicsPipeline = pipe(
			// createMatterPhysicsSyncSystem()
		// )


		// create the systems
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
