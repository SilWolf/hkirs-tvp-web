import api from '../services/api.service'
import { Cls } from '../types/class.type'
import { Course } from '../types/course.type'

export const getCourseById = (courseId: string): Promise<Course> => {
  return api.get<Course>(`/courses/${courseId}`)
}

export const getClassesByUserId = (userId: string): Promise<Cls[]> => {
  return api.get<Cls[]>(`/classes`, {
    params: {
      users_in: userId
    }
  })
}

export const setAuthorization = api.setAuthorization
export const removeAuthorization = api.removeAuthorization
