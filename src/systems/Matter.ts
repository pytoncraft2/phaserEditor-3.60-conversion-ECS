import * as Phaser from 'phaser'

import { defineSystem, defineQuery, enterQuery, exitQuery } from 'bitecs'

import { Position } from '../ecs-comps/Position'
import { MatterSprite, MatterStaticSprite } from '../ecs-comps/MatterSprite'
import { Rotation } from '../ecs-comps/Rotation'
import { Velocity } from '../ecs-comps/Velocity'
import { Scale } from '../ecs-comps/Scale'
import { MatterGameObject, MatterStaticGameObject } from '../ecs-comps/MatterGameObject'

const matterSpritesById = new Map<number, Phaser.Physics.Matter.Sprite>()
const matterGameObjectById = new Map<number, Phaser.GameObjects.GameObject>()

export function createMatterSpriteSystem(matter: Phaser.Physics.Matter.MatterPhysics, textures: string[]) {
	const query = defineQuery([Position, MatterSprite, Scale])

	// create enter and exit queries
	const onQueryEnter = enterQuery(query)

	return defineSystem(world => {
		// create matter sprite on enter
		const enterEntities = onQueryEnter(world)
		for (let i = 0; i < enterEntities.length; ++i) {
			const id = enterEntities[i]

			const x = Position.x[id]
			const y = Position.y[id]
			const textureId = MatterSprite.texture[id]
			
			const scale = {
				x: Scale.x[id],
				y: Scale.y[id]
			}
			const sprite = matter.add.sprite(x, y, textures[textureId]).setScale(scale.x, scale.y)

			matterSpritesById.set(id, sprite)
		}
		
		return world
	})
}

// export function createMatterPhysicsSyncSystem() {
// 	// create query
// 	const query = defineQuery([Position, MatterSprite])

// 	return defineSystem(world => {
// 		// sync simulated values back into components
// 		const entities = query(world)
// 		for (let i = 0; i < entities.length; ++i)
// 		{
// 			const id = entities[i]
// 			const sprite = matterSpritesById.get(id)

// 			if (!sprite)
// 			{
// 				continue
// 			}

// 			Position.x[id] = sprite.x
// 			Position.y[id] = sprite.y
// 		}

// 		return world
// 	})
// }

export function createMatterPhysicsSystem() {
	// create query
	const query = defineQuery([Rotation, Velocity, MatterSprite])

	return defineSystem(world => {
		const entities = query(world)
		for (let i = 0; i < entities.length; ++i)
		{
			const id = entities[i]
			const sprite = matterSpritesById.get(id)

			if (!sprite)
			{
				continue
			}

			// set the rotation
			sprite.angle = Rotation.angle[id]

			// set the velocity
			sprite.setVelocity(Velocity.x[id], Velocity.y[id])
		}

		return world
	})
}

export function createMatterStaticSpriteSystem() {
	// create query
	const query = defineQuery([MatterSprite, MatterStaticSprite])

	// create enter query
	const onQueryEnter = enterQuery(query)
	const onQueryExit = exitQuery(query)

	return defineSystem(world => {
		// loop through enter query entities
		const enterEntities = onQueryEnter(world)
		for (const id of enterEntities) {
			const sprite = matterSpritesById.get(id)

			if (!sprite)
			{
				continue
			}

			sprite.setStatic(true)
		}

		const exitEntities = onQueryExit(world)
		for (const id of exitEntities)
		{
			const sprite = matterSpritesById.get(id)

			if (!sprite)
			{
				continue
			}

			sprite.setStatic(false)
		}

		return world
	})
}

export function createMatterStaticGameObjectSystem(matter: Phaser.Physics.Matter.MatterPhysics, gameObject: Phaser.GameObjects.GameObject[]) {
	const query = defineQuery([Position, MatterGameObject, Scale])

	// create enter and exit queries
	const onQueryEnter = enterQuery(query)

	return defineSystem(world => {
		// create matter sprite on enter
		const enterEntities = onQueryEnter(world)
		for (let i = 0; i < enterEntities.length; ++i) {
			const id = enterEntities[i]

			const x = Position.x[id]
			const y = Position.y[id]
			const textureId = MatterGameObject.texture[id]
			
			const scale = {
				x: Scale.x[id],
				y: Scale.y[id]
			}
			// const sprite = matter.add.sprite(x, y, gameObject[textureId]).setScale(scale.x, scale.y)
			const object = matter.add.gameObject(gameObject[textureId], { isStatic: true });

			matterGameObjectById.set(id, object)
		}
		
		return world
	})
}