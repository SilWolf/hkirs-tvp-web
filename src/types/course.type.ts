import { Cls } from './class.type'
import { StrapiFile } from './strapi/StrapiFile.type'

export type Course = {
	id: string
	name: string
	description?: string
	createdAt: string
	updatedAt: string
	coverImage: StrapiFile
	classes: Cls[]

	rating: number
	ratingCount: number

	priceMin: number
	priceMax: number
}
