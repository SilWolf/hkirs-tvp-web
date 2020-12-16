import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useAsync } from 'react-async'
import { useParams } from 'react-router-dom'
import Spinner from 'reactstrap/lib/Spinner'
import PageBrandname from '../components/Page/PageBrand'
import PageTitle from '../components/Page/PageTitle'
import { getCourseById } from '../helpers/api.helper'
import { Course } from '../types/course.type'
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap'

const UpperWrapper = styled.div`
  max-width: 480px;
  width: 100%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`

const StyledSection = styled.div`
  margin-bottom: 72px;
`

const CourseCoverImage = styled.img`
  width: 100%;
  margin-bottom: 16px;
`

const getCourseByIdFn = ({ courseId }: any) => {
  return getCourseById(courseId)
}

const CoursePurchase = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const { register } = useForm<FormData>()

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
          <Form>
            <StyledSection>
              <h3>
                <Badge color="primary" pill>
                  1
                </Badge>{' '}
                選擇日子
              </h3>
              <FormGroup check>
                {course.classes &&
                  course.classes.length > 0 &&
                  course.classes.map((cls) => {
                    const label = `[${cls.code}] ${cls.startDate} - ${cls.endDate}`
                    return (
                      <Label key={cls.code} check>
                        <Input
                          name="period"
                          type="radio"
                          innerRef={register({ required: true })}
                        />
                        {label}
                      </Label>
                    )
                  })}
              </FormGroup>
            </StyledSection>

            <StyledSection>
              <h3>
                <Badge color="primary" pill>
                  2
                </Badge>{' '}
                填寫參加者資料
              </h3>
              <Row>
                <Col sm={4}>
                  <FormGroup>
                    <Label>姓名(中文全名)</Label>
                    <Input
                      type="text"
                      name="participantName"
                      innerRef={register({ required: true })}
                    />
                  </FormGroup>
                </Col>
                <Col sm={2}>
                  <FormGroup>
                    <Label>性別</Label>
                    <Input
                      type="select"
                      name="participantGender"
                      innerRef={register({ required: true })}
                    >
                      <option value="M">男</option>
                      <option value="F">女</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col sm={2}>
                  <FormGroup>
                    <Label>年齡</Label>
                    <Input
                      type="number"
                      name="participantAge"
                      innerRef={register({ required: true })}
                    />
                  </FormGroup>
                </Col>
                <Col sm={4}>
                  <FormGroup>
                    <Label>身分證號碼</Label>
                    <Input
                      type="text"
                      name="participantName"
                      innerRef={register({ required: true })}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </StyledSection>

            <Button size="lg" color="primary">
              付費
            </Button>
          </Form>
        </Container>
      </div>
    </>
  )
}

export default CoursePurchase
