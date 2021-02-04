import { Entity } from './strapi/entity.type'

export type Inventory = Entity & {
	name: string
	amount: number
}

export type InventoryLog = Entity & {
	quantity: number
	description: string
}
