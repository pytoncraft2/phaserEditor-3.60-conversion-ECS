import * as Phaser from 'phaser'
import {
	defineSystem,
	defineQuery,
} from 'bitecs'
import { Rotation } from '../ecs-comps/Rotation'
import { Velocity } from '../ecs-comps/Velocity'
import { Input } from '../ecs-comps/Input'

export function createSteeringSystem(speed = 200) {
	const query = defineQuery([Input, Rotation, Velocity])
	return defineSystem((world) => {
		const entities = query(world)
		for (const id of entities) {
			// know if moving
			console.log(Input.up[id]);
			
			const isUp = !!Input.up[id]
			const isDown = !!Input.down[id]
			const isMoving = isUp || isDown

			// if moving...
			if (isMoving)
			{
				const moveDir = isUp ? 1 : -1
				const isLeft = !!Input.left[id]
				const isRight = !!Input.right[id]

				let angle = Rotation.angle[id]

				if (isLeft)
				{
					angle -= 1 * moveDir
				}
				else if (isRight)
				{
					angle += 1 * moveDir
				}

				Rotation.angle[id] = angle

				const rotation = Phaser.Math.DegToRad(angle)
				const vec = new Phaser.Math.Vector2()
				vec.setToPolar(rotation, 1)

				Velocity.x[id] = vec.x * speed * moveDir
				Velocity.y[id] = vec.y * speed * moveDir
			}
			else
			{
				Velocity.x[id] = 0
				Velocity.y[id] = 0
			}

			// decide on a moving direction

			// know if turning

			// adjust angle based on turn direction

			// if not moving then set velocity to 0
		}

		return world
	})
}
