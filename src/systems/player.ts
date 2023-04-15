import * as Phaser from 'phaser'
import {
	defineSystem,
	defineQuery,
} from 'bitecs'

import Velocity from '../ecs-comps/Velocity'
import Rotation from '../ecs-comps/Rotation'
import Player from '../ecs-comps/Player'
import Input, { Direction } from '../ecs-comps/Input'

export default function createPlayerSystem(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
	const playerQuery = defineQuery([Player, Velocity, Rotation, Input])

	return defineSystem((world) => {
		const entities = playerQuery(world)
		
		for (let i = 0; i < entities.length; ++i)
		{
			const id = entities[i]
			
			if (cursors.left.isDown)
			{
				Input.direction[id] = Direction.Left
			}
			else if (cursors.right.isDown)
			{
				Input.direction[id] = Direction.Right
			}
			else if (cursors.up.isDown)
			{
				Input.direction[id] = Direction.Up
			}
			else if (cursors.down.isDown)
			{
				Input.direction[id] = Direction.Down
			}
			else if (cursors.space.isDown)
			{
				Input.direction[id] = Direction.Space
			}
			else
			{
				Input.direction[id] = Direction.None
			}
		}
	
		return world
	})
}
