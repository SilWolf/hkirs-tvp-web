import React from 'react'
import styled from 'styled-components'
import { useAsync } from 'react-async'
import { useParams } from 'react-router-dom'
import Spinner from 'reactstrap/lib/Spinner'
import PageBrandname from '../components/Page/PageBrand'
import PageTitle from '../components/Page/PageTitle'
import { getClassesByUserId } from '../helpers/api.helper'
import { Course } from '../types/course.type'
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap'
import ReactMarkdown from 'react-markdown'
import { Cls } from '../types/class.type'

import store from '../store'
import ClsRow from '../components/Cls/ClsRow'

const UpperWrapper = styled.div`
  max-width: 480px;
  width: 100%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`

const CourseCoverImage = styled.img`
  width: 100%;
  margin-bottom: 16px;
`

const CoursePrice = styled.div`
  font-size: 24px;
`

const getClassesFn = ({ userId }: any) => {
  return getClassesByUserId(userId || 'foo')
}

const CourseDetail = () => {
  // Assume the user id is here
  const userId = store.getState().authUser.user?.id as string

  const classesAsync = useAsync<Cls[]>({
    promiseFn: getClassesFn,
    userId,
  })

  if (classesAsync.isLoading) {
    return (
      <div className="content">
        <Spinner type="grow" color="primary" />
      </div>
    )
  }

  const classes = classesAsync.data as Cls[]

  return (
    <>
      <PageTitle>我的課程</PageTitle>
      <PageBrandname>我的課程</PageBrandname>
      <div className="content">
        {classes.map((cls) => {
          return (
            <>
              <ClsRow cls={cls} />
              <hr />
            </>
          )
        })}
      </div>
    </>
  )
}

export default CourseDetail
