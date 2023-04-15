import * as Phaser from 'phaser'
import {
	defineSystem,
	defineQuery,
	enterQuery,
	exitQuery
} from 'bitecs'

import Position from '../ecs-comps/Position'
import Rotation from '../ecs-comps/Rotation'
import Velocity from '../ecs-comps/Velocity'
import { ArcadeSprite, ArcadeSpriteStatic } from '../ecs-comps/ArcadeSprite'
import Alpha from '../ecs-comps/Alpha'

export const createArcadeSpriteSystem = (group: Phaser.Physics.Arcade.Group, textures: string[]) => {
	const spritesById = new Map<number, Phaser.Physics.Arcade.Sprite>()

	const spriteQuery = defineQuery([Position, Rotation, Velocity, ArcadeSprite])
	
	const spriteQueryEnter = enterQuery(spriteQuery)
	const spriteQueryExit = exitQuery(spriteQuery)

	return defineSystem((world) => {
		const entitiesEntered = spriteQueryEnter(world)
		for (let i = 0; i < entitiesEntered.length; ++i)
		{
			
			const id = entitiesEntered[i]
			const texId = ArcadeSprite.texture[id]
			const texture = textures[texId]
			
			const sprite = group.get(Position.x[id], Position.y[id], texture)
			
			spritesById.set(id, sprite)
		}

		const entities = spriteQuery(world)
		for (let i = 0; i < entities.length; ++i)
		{
			const id = entities[i]

			const sprite = spritesById.get(id)
			if (!sprite)
			{
				// log an error
				continue
			}

			sprite.setVelocity(Velocity.x[id], Velocity.y[id])
			sprite.angle = Rotation.angle[id]
			// sprite.alpha = Alpha.alpha[id]
		}

		const entitiesExited = spriteQueryExit(world)
		for (let i = 0; i < entitiesExited.length; ++i)
		{
			const id = entitiesEntered[i]
			const sprite = spritesById.get(id)

			if (!sprite) continue;

			group.killAndHide(sprite)
			spritesById.delete(id)
		}

		return world
	})
}

export const createArcadeSpriteStaticSystem = (group: Phaser.Physics.Arcade.StaticGroup, textures: string[]) => {
	const spritesById = new Map<number, Phaser.Physics.Arcade.Sprite>()

	const spriteQuery = defineQuery([Position, ArcadeSpriteStatic])
	
	const spriteQueryEnter = enterQuery(spriteQuery)
	const spriteQueryExit = exitQuery(spriteQuery)

	return defineSystem((world) => {
		const entitiesEntered = spriteQueryEnter(world)
		for (let i = 0; i < entitiesEntered.length; ++i)
		{
			
			const id = entitiesEntered[i]
			const texId = ArcadeSpriteStatic.texture[id]
			const texture = textures[texId]

			const sprite = group.get(Position.x[id], Position.y[id], texture)
			
			spritesById.set(id, sprite)
		}

		// const entities = spriteQuery(world)
		// for (let i = 0; i < entities.length; ++i)
		// {
		// 	const id = entities[i]

		// 	const sprite = spritesById.get(id)
		// 	if (!sprite)
		// 	{
		// 		// log an error
		// 		continue
		// 	}

		// 	sprite.setVelocity(Velocity.x[id], Velocity.y[id])
		// 	sprite.angle = Rotation.angle[id]
		// 	sprite.alpha = Alpha.alpha[id]
		// }

		const entitiesExited = spriteQueryExit(world)
		for (let i = 0; i < entitiesExited.length; ++i)
		{
			const id = entitiesEntered[i]
			const sprite = spritesById.get(id)

			if (!sprite) continue;

			group.killAndHide(sprite)
			spritesById.delete(id)
		}

		return world
	})
}