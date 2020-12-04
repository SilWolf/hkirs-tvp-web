import api from '../services/api.service'
import { Course } from '../types/course.type'

export const getClassesByUserId = (userId: string): Promise<Course> => {
  return api.get<Course>(`/classes?`)
}

export const getCourseById = (courseId: string): Promise<Course> => {
  return api.get<Course>(`/courses/${courseId}`)
}

export const setAuthorization = api.setAuthorization
export const removeAuthorization = api.removeAuthorization
