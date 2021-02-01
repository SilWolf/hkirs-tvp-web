import { Course } from './course.type'
import { Entity } from './strapi/entity.type'
import { Venue } from './venue.type'

export type Cls = Entity & {
	id: string
	price: number
	capacity: number
	code: string
	startDate: string
	endDate: string
	createdAt: string
	updatedAt: string

	course: Course
	lessons: ClsLesson[]
}

export type ClsLesson = Entity & {
	id: string
	title: string
	startAt: string
	endAt: string

	cls: Cls
	venue: Venue
}
