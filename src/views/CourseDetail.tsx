import React from 'react'
import styled from 'styled-components'
import { useAsync } from 'react-async'
import { useParams } from 'react-router-dom'
import Spinner from 'reactstrap/lib/Spinner'
import PageBrandname from '../components/Page/PageBrand'
import PageTitle from '../components/Page/PageTitle'
import { getCourseById } from '../helpers/api.helper'
import { Course } from '../types/course.type'
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap'
import ReactMarkdown from 'react-markdown'

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

const getCourseByIdFn = ({ courseId }: any) => {
  return getCourseById(courseId)
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
        <UpperWrapper>
          <h5>{course.name}</h5>
          <CourseCoverImage src={course.coverImage.url} />
          <p>
            評分: {course.rating.toFixed(1)}/5.0 ( {course.ratingCount} 條評論 )
          </p>
        </UpperWrapper>

        <Container>
          <Row>
            <Col md={8}>
              <Card>
                <CardBody>
                  <h3>描述</h3>
                  <ReactMarkdown>{course.description || ''}</ReactMarkdown>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <div className="text-muted">此課程費用低至</div>
              <CoursePrice>
                ${course.priceMin.toFixed(2)} - ${course.priceMax.toFixed(2)}
              </CoursePrice>

              <Button
                color="primary"
                size="lg"
                block
                onClick={() => {
                  alert('在試用版中不開放此功能。')
                }}
              >
                立即報名
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default CourseDetail
