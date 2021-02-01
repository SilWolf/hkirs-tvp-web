import { Cls, ClsLesson } from '../types/cls.type'
import { Course } from '../types/course.type'
import { ELearning } from '../types/elearning.type'
import { UserEvent } from '../types/user-event.type'
import { UserSchedule } from '../types/user-schedule.type'
import { Venue, VenueBooking } from '../types/venue.type'

import api, { ExtendedAxiosRequestConfig } from '../services/api.service'

export const getCourseById = (courseId: string): Promise<Course> => {
	return api.get<Course>(`/courses/${courseId}`)
}

export const getClassesByUserId = (userId: string): Promise<Cls[]> => {
	return api.get<Cls[]>(`/classes`, {
		params: {
			users_in: userId,
		},
	})
}
export const getClassByClassId = (classId: string): Promise<Cls> => {
	return api.get<Cls>(`/classes/${classId}`)
}

export const getClsLessonsByDateRange = (
	start: Date,
	end: Date,
	config: ExtendedAxiosRequestConfig = {}
): Promise<ClsLesson[]> => {
	return api.get<ClsLesson[]>(`/lessons`, {
		params: {
			startAt_gte: start.toISOString(),
			startAt_lte: end.toISOString(),
		},
		...config,
	})
}

export const getELearningByClassId = (classId: string): Promise<ELearning> => {
	return api
		.get<ELearning[]>(`/e-learnings`, {
			params: {
				classes_in: classId,
			},
		})
		.then((elearnings) => elearnings[0])
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
	return api.get<VenueBooking[]>(`/lessons`, {
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

export const setAuthorization = api.setAuthorization
export const removeAuthorization = api.removeAuthorization
