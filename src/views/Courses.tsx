import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useRouteMatch } from 'react-router-dom'

import { Course } from '../types/course.type'

import { getCourses } from '../helpers/api.helper'

import {
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Col,
	Container,
	Row,
	Spinner,
} from 'reactstrap'

const Courses = (): JSX.Element => {
	const routeMatch = useRouteMatch()
	const [page] = useState<number>(0)

	const coursesQuery = useQuery<Course[]>(
		['courses', page],
		() => getCourses({ page }),
		{
			keepPreviousData: true,
		}
	)

	if (coursesQuery.isLoading) {
		return (
			<div className='content'>
				<div className='text-center'>
					<Spinner type='grow' color='primary' />
				</div>
			</div>
		)
	}

	if (coursesQuery.isError) {
		return <div className='content'>Error</div>
	}

	return (
		<div className='content'>
			<Container>
				<Row>
					{coursesQuery.data &&
						coursesQuery.data.map((course) => (
							<Col xs={4} key={course.id}>
								<Card>
									{course.coverImage && (
										<CardImg top width='100%' src={course.coverImage.url} />
									)}
									<CardBody>
										<CardTitle tag='h5'>{course.name}</CardTitle>
										<CardText>{course.description}</CardText>
										<div className='text-right'>
											<Link to={`${routeMatch.path}/${course.id}`}>
												<a>查看更多 &gt;&gt;</a>
											</Link>
										</div>
									</CardBody>
								</Card>
							</Col>
						))}
				</Row>
			</Container>
		</div>
	)
}

export default Courses
