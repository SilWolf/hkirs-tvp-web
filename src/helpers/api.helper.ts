import { Cls, ClsAnnouncement, ClsApplication } from '../types/cls.type'
import { Course } from '../types/course.type'
import { Inventory, InventoryLog } from '../types/inventory.type'
import { Entity } from '../types/strapi/entity.type'
import { UserEvent } from '../types/user-event.type'
import { UserSchedule } from '../types/user-schedule.type'
import { Venue, VenueBooking } from '../types/venue.type'

import api, { ExtendedAxiosRequestConfig } from '../services/api.service'

export const getCourses = (
	options: { page: number } = { page: 0 },
	config: ExtendedAxiosRequestConfig = {}
): Promise<Course[]> => {
	return api.get<Course[]>(`/courses`, {
		params: {
			_limit: 9,
			_start: 9 * options.page,
			_sort: 'createdAt:DESC',
		},
		...config,
	})
}
export const getCourseById = (courseId: string): Promise<Course> => {
	return api.get<Course>(`/courses/${courseId}`)
}

export const getCourseClses = (courseId: string): Promise<Cls[]> => {
	return api.get<Cls[]>(`/courses/${courseId}/clses`)
}
export const getClassesByUserId = (userId: string): Promise<Cls[]> => {
	return api.get<Cls[]>(`/classes`, {
		params: {
			users_in: userId,
		},
	})
}
export const getClsById = (classId: string): Promise<Cls> => {
	return api.get<Cls>(`/classes/${classId}`)
}
export const postClsApplication = (
	clsId: string,
	data: Omit<ClsApplication, keyof Entity | 'isPaid' | 'isConfirmed' | 'cls'>
): Promise<ClsApplication & { _stripeSessionId: string }> => {
	return api.post<ClsApplication & { _stripeSessionId: string }>(
		`classes/${clsId}/application`,
		data
	)
}

export const getMyClsesByDateRange = (
	start: Date,
	end: Date,
	config: ExtendedAxiosRequestConfig = {}
): Promise<Cls[]> => {
	return api.get<Cls[]>(`/classes/me`, {
		params: {
			startAt: start.toISOString(),
			endAt: end.toISOString(),
		},
		...config,
	})
}

export const getUserSchedulesByUserId = (
	userId: string
): Promise<UserSchedule[]> => {
	return api.get<UserSchedule[]>(`/user-schedules`, {
		params: {
			user: userId,
		},
	})
}

export const getUserEventsByUserId = (userId: string): Promise<UserEvent[]> => {
	return api.get<UserEvent[]>(`/user-events`, {
		params: {
			user: userId,
			_sort: 'createdAt:DESC',
		},
	})
}

export const getVenues = (): Promise<Venue[]> => {
	return api.get<Venue[]>(`/venues`)
}
export const getVenueBookingsByDateRange = (
	start: Date,
	end: Date,
	config: ExtendedAxiosRequestConfig = {}
): Promise<VenueBooking[]> => {
	return api.get<VenueBooking[]>(`/venue-bookings`, {
		params: {
			startAt_gte: start.toISOString(),
			startAt_lte: end.toISOString(),
		},
		...config,
	})
}
export const postVenueBooking = (vb: VenueBooking): Promise<VenueBooking> => {
	return api.post<VenueBooking>(`/venue-bookings`, vb)
}

export const getInventories = (): Promise<Inventory[]> => {
	return api.get<Inventory[]>(`/inventories`)
}
export const getInventoryLogs = (iId: string): Promise<InventoryLog[]> => {
	return api.get<InventoryLog[]>(`/inventories/${iId}/logs`)
}
export const postInventoryLog = (
	iId: string,
	iL: InventoryLog
): Promise<InventoryLog> => {
	return api.post<InventoryLog>(`/inventories/${iId}/logs`, iL)
}

export const getClsApplicationById = (
	caId: string
): Promise<ClsApplication> => {
	return api.get<ClsApplication>(`/cls-applications/${caId}`)
}
export const getMyClsApplications = (): Promise<ClsApplication[]> => {
	return api.get<ClsApplication[]>(`/cls-applications/me`)
}

export const getClsAnnouncementById = (
	clsId: string
): Promise<ClsAnnouncement[]> => {
	return api.get<ClsAnnouncement[]>(`/classes/${clsId}/announcements`)
}

export const setAuthorization = api.setAuthorization
export const removeAuthorization = api.removeAuthorization
