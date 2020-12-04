import { Course } from './course.type';

export type Cls = {
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

export type ClsLesson = {
  id: string
  title: string
  startAt: string
  endAt: string
}