import { Course } from './course.type'
import { Entity } from './strapi/entity.type'
import { Venue } from './venue.type'

export type Cls = Entity & {
	code: string
	name: string
	price: number
	capacityMin: number
	capacityMax: number
	startAt: string
	endAt: string

	course: Course
	lessons: ClsLesson[]
}

export type ClsLesson = Entity & {
	name: string
	startAt: string
	endAt: string
}

export type ClsApplication = Entity & {
	name: string
	gender: 'M' | 'F'
	age: number
	hkid: string
	isPaid: boolean
	isConfirmed: boolean
	cls: Cls
}
