import React, { useCallback, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import lightFormat from 'date-fns/lightFormat'

import { Cls } from '../types/cls.type'
import { Course } from '../types/course.type'

import {
	getCourseById,
	getCourseClses,
	postClsApplication,
} from '../helpers/api.helper'
import { loadStripe } from '../helpers/stripe.helper'
import useLocalStorage from '../hooks/useLocalstorage.hook'

import {
	Badge,
	Col,
	Container,
	Form,
	FormFeedback,
	FormGroup,
	FormText,
	Input,
	Label,
	Row,
} from 'reactstrap'
import Spinner from 'reactstrap/lib/Spinner'
import Button from '../components/Button'
import PageBrandname from '../components/Page/PageBrand'
import PageTitle from '../components/Page/PageTitle'

const UpperWrapper = styled.div`
	max-width: 480px;
	width: 100%;
	text-align: center;
	margin-left: auto;
	margin-right: auto;
`

const StyledSection = styled.div`
	margin-top: 2em;
`

const CourseCoverImage = styled.img`
	width: 100%;
	margin-bottom: 16px;
`

type FormProps = {
	clsId: string
	name: string
	gender: 'M' | 'F'
	age: number
	hkid: string
	savePersonalInfo: boolean
}
const _defaultFormProps = {
	clsId: '',
	name: '',
	gender: 'M' as const,
	age: 10,
	hkid: '',
	savePersonalInfo: true,
}

const CoursePurchase = (): JSX.Element => {
	const [personalInfo, setPersonalInfo] = useLocalStorage<
		Pick<FormProps, 'name' | 'gender' | 'age' | 'hkid'>
	>('coursePurchasePersonalInfo', {
		name: '',
		gender: 'M',
		age: 6,
		hkid: '',
	})
	const { courseId } = useParams<{ courseId: string }>()
	const courseQuery = useQuery<Course>(['course', courseId], () =>
		getCourseById(courseId)
	)
	const clsesQuery = useQuery<Cls[]>(
		['course', courseId, 'clses'],
		() => getCourseClses(courseQuery.data?.id || ''),
		{
			enabled: !!courseQuery.data,
			select: (clses: Cls[]) =>
				clses.map((cls: Cls) => ({
					...cls,
					startAt: lightFormat(new Date(cls.startAt), 'yyyy年MM月dd日 HH:mm'),
					endAt: lightFormat(new Date(cls.endAt), 'yyyy年MM月dd日 HH:mm'),
					name: cls.code ? `[${cls.code}] ${cls.name}` : cls.name,
				})),
		}
	)
	const applicationMutation = useMutation((data: FormProps) => {
		return postClsApplication(data.clsId, {
			name: data.name,
			gender: data.gender,
			age: data.age,
			hkid: data.hkid,
		})
	})
	const { register, control, errors, handleSubmit: rhfHandleSubmit } = useForm<
		FormProps
	>({
		defaultValues: {
			..._defaultFormProps,
			...personalInfo,
		},
	})
	const clsId = useWatch({ control, name: 'clsId', defaultValue: '' })
	const selectedCls = useMemo<Cls | undefined>(
		() => clsesQuery.data?.find((cls) => cls.id === clsId),
		[clsesQuery.data, clsId]
	)

	const handleSubmit = useCallback(
		rhfHandleSubmit(async (data: FormProps) => {
			if (data.savePersonalInfo) {
				setPersonalInfo({
					name: data.name,
					gender: data.gender,
					age: data.age,
					hkid: data.hkid,
				})
			}
			const res = await applicationMutation.mutateAsync(data)

			if (res._stripeSessionId) {
				const stripe = await loadStripe
				console.log(stripe)
				const stripeResult = await stripe?.redirectToCheckout({
					sessionId: res._stripeSessionId,
				})

				if (stripeResult?.error) {
					toast.error('無法轉到付費頁面。')
				}
			}
		}),
		[rhfHandleSubmit, applicationMutation]
	)

	if (courseQuery.isLoading) {
		return (
			<div className='content'>
				<Spinner type='grow' color='primary' />
			</div>
		)
	}

	const course = courseQuery.data as Course

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
					<Form onSubmit={handleSubmit}>
						<StyledSection>
							<h3>
								<Badge color='primary' pill>
									1
								</Badge>{' '}
								填寫參加者資料
							</h3>
							<Row>
								<Col sm={4}>
									<FormGroup>
										<Label>姓名(中文全名)</Label>
										<Input
											type='text'
											name='name'
											maxLength={5}
											innerRef={register({ required: '必須填寫' })}
											invalid={!!errors.name}
										/>
										{errors.name && (
											<FormFeedback>{errors.name?.message}</FormFeedback>
										)}
									</FormGroup>
								</Col>
								<Col sm={2}>
									<FormGroup>
										<Label>性別</Label>
										<Input
											type='select'
											name='gender'
											innerRef={register({ required: '必須填寫' })}
											invalid={!!errors.gender}
										>
											<option value='M'>男</option>
											<option value='F'>女</option>
										</Input>
										{errors.gender && (
											<FormFeedback>{errors.gender?.message}</FormFeedback>
										)}
									</FormGroup>
								</Col>
								<Col sm={2}>
									<FormGroup>
										<Label>年齡</Label>
										<Input
											type='number'
											name='age'
											maxLength={2}
											innerRef={register({
												required: '必須填寫',
												valueAsNumber: true,
											})}
											invalid={!!errors.age}
										/>
										{errors.age && (
											<FormFeedback>{errors.age?.message}</FormFeedback>
										)}
									</FormGroup>
								</Col>
								<Col sm={4}>
									<FormGroup>
										<Label>身分證號碼</Label>
										<Input
											type='text'
											name='hkid'
											placeholder='A123'
											maxLength={4}
											innerRef={register({ required: '必須填寫' })}
											invalid={!!errors.hkid}
										/>
										{errors.hkid && (
											<FormFeedback>{errors.hkid?.message}</FormFeedback>
										)}
										<FormText color='muted'>
											請填寫身分證字號首4位。A123456(7) =&gt; A123
										</FormText>
									</FormGroup>
								</Col>
							</Row>
							<FormGroup check>
								<Label check>
									<Input
										name='savePersonalInfo'
										type='checkbox'
										innerRef={register}
									/>{' '}
									儲存作以後報名之用
									<span className='form-check-sign'>
										<span className='check'></span>
									</span>
								</Label>
							</FormGroup>
						</StyledSection>

						<StyledSection>
							<h3>
								<Badge color='primary' pill>
									2
								</Badge>{' '}
								選擇日子
							</h3>
							<FormGroup check>
								{clsesQuery.isLoading && <div>讀取中……</div>}
								{clsesQuery.data &&
									clsesQuery.data.map((cls) => {
										const label = `${cls.name} ${cls.startAt} - ${cls.endAt}`
										return (
											<Label key={cls.code} check>
												<Input
													name='clsId'
													type='radio'
													value={cls.id}
													innerRef={register({ required: '必須填寫' })}
												/>
												{label}
											</Label>
										)
									})}
							</FormGroup>
						</StyledSection>

						<StyledSection>
							<h3>
								<Badge color='primary' pill>
									3
								</Badge>{' '}
								確認付費內容
							</h3>
							<h6>課程名稱: {course.name || ''}</h6>
							<h6>所選課堂: {selectedCls?.name || '(未選擇)'}</h6>
							<h6>應付款項: HKD${selectedCls?.price || '(未選擇)'}</h6>
						</StyledSection>

						<div className='text-center'>
							<Button
								type='submit'
								size='lg'
								color='primary'
								disabled={!selectedCls || applicationMutation.isLoading}
								isLoading={applicationMutation.isLoading}
							>
								提交及前往付費程序
							</Button>
						</div>
					</Form>
				</Container>
			</div>
		</>
	)
}

export default CoursePurchase
