
// You can write more code here
import { addComponent, addEntity, IWorld } from "bitecs";
import { Velocity } from "../ecs-comps/Velocity";
import { Position } from "../ecs-comps/Position";
import { ArcadeSprite } from "../ecs-comps/ArcadeSprite";
// import { BulletTag } from "../ecs-comps/BulletTag";
import { Textures } from "../types/texture";
import * as Phaser from "phaser";

/* START OF COMPILED CODE */

export default class Bullet extends Phaser.GameObjects.Container {

	constructor(scene: Phaser.Scene, x?: number, y?: number) {
		super(scene, x ?? 0, y ?? 0);

		this.scaleX = 0.5446695508423897;
		this.scaleY = 0.4920934308794387;

		// guapen_1
		const guapen_1 = scene.add.sprite(0, 0, "guapen");
		guapen_1.scaleX = 0.5;
		guapen_1.scaleY = 0.5;
		this.add(guapen_1);

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.once('ecs-world', (w: IWorld) => {
			this.world = w;
			guapen_1.setActive(false)
			guapen_1.setVisible(false)
			this.constructEnity(this.x, this.y)
		}, this)
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	// Write your code here.
	private world?: IWorld

	constructEnity(x: number = 0, y: number = 0)
	{
		if(!this.world)
		{
			return
		}

		const bullet = addEntity(this.world)

		console.log(`bullet: ${bullet}`)

		const compList = [
			Velocity,
			Position,
			ArcadeSprite,
			// BulletTag
		]

		compList.forEach(comp => {
			if(!this.world)
			{
				return
			}
			addComponent(this.world, comp, bullet)
		})

		ArcadeSprite.texture[bullet] = Textures.Guapen
		Position.x[bullet] = x
		Position.y[bullet] = y

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
