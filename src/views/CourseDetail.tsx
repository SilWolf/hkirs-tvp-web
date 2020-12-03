import React from 'react'
import { useAsync } from 'react-async'
import { useParams } from 'react-router-dom'
import Spinner from 'reactstrap/lib/Spinner'
import PageBrandname from '../components/Page/PageBrand'
import PageTitle from '../components/Page/PageTitle'
import {
  getCourseById,
} from '../helpers/api.helper'
import { Course } from '../types/course.type'

const getCourseByIdFn = ({ courseId }: any) => {
  return getCourseById(courseId || 'foo')
}

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>()

  const courseAsync = useAsync<Course>({
    promiseFn: getCourseByIdFn,
    courseId,
  })

  if (courseAsync.isLoading) {
    return (
      <div className="content">
        <Spinner type="grow" color="primary" />
      </div>
    )
  }

  const course = courseAsync.data as Course

  return (
    <>
      <PageTitle>{course.name}</PageTitle>
      <PageBrandname>{course.name}</PageBrandname>
      <div className="content">

      </div>
    </>
  )
}

export default CourseDetail
