import React, { useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import { useQuery } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Course } from '../types/course.type'

import { getCourseById } from '../helpers/api.helper'

import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap'
import Spinner from 'reactstrap/lib/Spinner'
import PageBrandname from '../components/Page/PageBrand'
import PageTitle from '../components/Page/PageTitle'

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

const CourseDetail = (): JSX.Element => {
	const { courseId } = useParams<{ courseId: string }>()
	const history = useHistory()

	const courseQuery = useQuery<Course>(['course', courseId], () =>
		getCourseById(courseId)
	)
	const course = courseQuery.data as Course

	const handleClickSignUp = useCallback(
		(courseId: string) => {
			history.push(`/student/course-purchase/${courseId}`)
		},
		[history]
	)

	if (courseQuery.isLoading) {
		return (
			<div className='content'>
				<div className='text-center'>
					<Spinner type='grow' color='primary' />
				</div>
			</div>
		)
	}

	return (
		<>
			<PageTitle>{course.name}</PageTitle>
			<PageBrandname>{course.name}</PageBrandname>
			<div className='content'>
				<UpperWrapper>
					<h5>{course.name}</h5>
					{course.coverImage && (
						<CourseCoverImage src={course.coverImage.url} />
					)}
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
							<div className='text-muted'>此課程費用低至</div>
							<CoursePrice>
								${course.priceMin.toFixed(2)} - ${course.priceMax.toFixed(2)}
							</CoursePrice>

							<Button
								color='primary'
								size='lg'
								block
								onClick={() => handleClickSignUp(course.id)}
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
