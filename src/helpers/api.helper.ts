import api from '../services/api.service'
import { Cls } from '../types/class.type'
import { Course } from '../types/course.type'
import { ELearning } from '../types/elearning.type'
import { UserEvent } from '../types/user-event.type'
import { UserSchedule } from '../types/user-schedule.type'

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
    },
  })
}

export const setAuthorization = api.setAuthorization
export const removeAuthorization = api.removeAuthorization
