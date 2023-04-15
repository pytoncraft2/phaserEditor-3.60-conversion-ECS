import {
	defineSystem,
	defineQuery,
} from 'bitecs'

import Position from '../components/Position'
import Velocity from '../components/Velocity'
import Rotation from '../components/Rotation'
import Input, { Direction } from '../components/Input'
import Alpha from '../components/Alpha'

export default function createMovementSystem() {
	const movementQuery = defineQuery([Position, Velocity, Input, Rotation, Alpha])

	return defineSystem((world) => {
		const entities = movementQuery(world)
		
		for (let i = 0; i < entities.length; ++i)
		{
			const id = entities[i]

			const direction = Input.direction[id]
			const speed = 200

			switch (direction)
			{
				case Direction.None:
					Velocity.x[id] = 0
					Velocity.y[id] = 0
					break

				case Direction.Left:
					Velocity.x[id] = -speed
					Velocity.y[id] = 0
					Rotation.angle[id] = 180
					break

				case Direction.Right:
					Velocity.x[id] = speed
					Velocity.y[id] = 0
					Rotation.angle[id] = 0
					break

				case Direction.Up:
					Velocity.x[id] = 0
					Velocity.y[id] = -speed
					Rotation.angle[id] = 270
					break

				case Direction.Down:
					Velocity.x[id] = 0
					Velocity.y[id] = speed
					Rotation.angle[id] = 90
					break

				case Direction.Space:
					Alpha.alpha[id] = 0.5
					break
			}

		}
	
		return world
	})
}
