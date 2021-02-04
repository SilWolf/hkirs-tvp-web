import { Entity } from './strapi/entity.type'
import { User } from './user.type'

export type Inventory = Entity & {
	name: string
	amount: number
}

export type InventoryLog = Entity & {
	quantity: number
	description: string
	user: User
}
