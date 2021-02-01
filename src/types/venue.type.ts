import { Entity } from './strapi/entity.type'
import { User } from './user.type'

export type Venue = Entity & {
	name: string
}

export type VenueBooking = Entity & {
	startAt: string
	endAt: string
	bookingReason: string
	rejectingReason?: string
	venue: Venue
	bookedBy?: User
}
