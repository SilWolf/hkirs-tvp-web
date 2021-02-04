import React, { useCallback, useMemo, useState } from 'react'
import {
	Controller as ReactHookFormController,
	NestedValue,
	useForm,
} from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import addHours from 'date-fns/addHours'
import addMonths from 'date-fns/addMonths'
import endOfMonth from 'date-fns/endOfMonth'
import lightFormat from 'date-fns/lightFormat'
import startOfHour from 'date-fns/startOfHour'
import classnames from 'classnames'

import { Venue, VenueBooking } from '../types/venue.type'

import {
	getVenueBookingsByDateRange,
	getVenues,
	postVenueBooking,
} from '../helpers/api.helper'

import {
	Button,
	Col,
	Form,
	FormFeedback,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
} from 'reactstrap'
import Calendar from '../components/Calendar/Calendar'
import StyledReactSelect from '../components/Select/StyledReactSelect'

import '../assets/scss/views/VenueBookings.view.scss'

const _titleAccessor = (venueBooking: VenueBooking) => venueBooking.venue.name
const _tooltipAccessor = (venueBooking: VenueBooking) => venueBooking.venue.name
const _startAccessor = (venueBooking: VenueBooking) =>
	new Date(venueBooking.startAt)
const _endAccessor = (venueBooking: VenueBooking) =>
	new Date(venueBooking.endAt)
const _eventPropGetter = () => {
	return {
		className: classnames(
			'event-venueBooking'
			// `event-venueBooking-status-${venueBooking.status}`
		),
	}
}

const _componentEvent = ({ event: venueBooking }: { event: VenueBooking }) => {
	return (
		<>
			<span className='event-venueBooking-title'>
				{venueBooking.venue.name}
			</span>
		</>
	)
}
const _components = {
	event: _componentEvent,
}

const _venueOptionLabel = (venue: Venue) => venue.name

type VenueBookingDTO = Omit<
	VenueBooking,
	| 'id'
	| 'startAt'
	| 'endAt'
	| 'bookedBy'
	| 'createdAt'
	| 'updatedAt'
	| 'venue'
	| 'rejectingReason'
> & {
	startAtDate: string
	startAtTime: string
	endAtDate: string
	endAtTime: string
	venue: NestedValue<Venue> | null
}

const bookingStartAt = startOfHour(new Date())
const bookingEndAt = addHours(bookingStartAt, 1)
const bookingDefaultValues: VenueBookingDTO = {
	venue: null,
	startAtDate: lightFormat(bookingStartAt, 'yyyy-MM-dd'),
	startAtTime: lightFormat(bookingStartAt, 'HH:mm'),
	endAtDate: lightFormat(bookingEndAt, 'yyyy-MM-dd'),
	endAtTime: lightFormat(bookingEndAt, 'HH:mm'),
	bookingReason: '',
}

const venueBookingsQueryKey = (date: Date) =>
	`${date?.getFullYear()}-${date?.getMonth()}`

const VenueBookings = (): JSX.Element => {
	const queryClient = useQueryClient()
	const history = useHistory()
	const [venueBookingsMap, setVenueBookingsMap] = useState<{
		[x: string]: VenueBooking[]
	}>({})
	const [activeVenueId, setActiveVenueId] = useState<string | undefined>(
		undefined
	)

	const venueBookings = useMemo(
		() =>
			Array<VenueBooking>()
				.concat(...Object.values(venueBookingsMap))
				.filter((vb) => (activeVenueId ? vb.venue.id === activeVenueId : true)),
		[venueBookingsMap, activeVenueId]
	)

	const venuesQuery = useQuery(['venues'], () => getVenues(), {
		select: (venues: Venue[]) => venues as NestedValue<Venue>[],
		staleTime: Infinity,
	})

	const handleCalendarMonthChange = useCallback(
		({ start }: { start: Date }) => {
			const prevMonth = addMonths(start, -1)
			const nextMonth = addMonths(start, 1)
			const thisMonth = start

			;[prevMonth, thisMonth, nextMonth].forEach((date) => {
				const queryKey = venueBookingsQueryKey(date)
				const endOfMonthOfDate = endOfMonth(date)
				if (!venueBookingsMap[queryKey]) {
					queryClient
						.fetchQuery<VenueBooking[]>(
							['venueBookings', queryKey],
							() => getVenueBookingsByDateRange(date, endOfMonthOfDate),
							{
								staleTime: 60000,
							}
						)
						.then((venueBookings: VenueBooking[]) => {
							setVenueBookingsMap((prev) => ({
								...prev,
								[queryKey]: venueBookings,
							}))
						})
				}
			})
		},
		[venueBookingsMap, queryClient]
	)

	const handleCalendarSelectEvent = useCallback(
		(venueBooking: VenueBooking) => {
			history.push(`/${venueBooking.id}`)
		},
		[history]
	)

	const handleChangeVenueFilter = useCallback(
		(venue: Venue | null) => {
			setActiveVenueId(venue?.id)
		},
		[setActiveVenueId]
	)

	const [isNewVBModalOpened, setIsNewVBModalOpened] = useState<boolean>(false)
	const handleToggleNewVBModal = useCallback(() => {
		setIsNewVBModalOpened((prev) => !prev)
	}, [setIsNewVBModalOpened])

	const { control, register, handleSubmit, errors, setError } = useForm<
		VenueBookingDTO
	>({
		defaultValues: bookingDefaultValues,
	})

	const venueBookingMutation = useMutation(
		(vb: VenueBooking) => {
			return postVenueBooking(vb)
		},
		{
			onSuccess: (vb: VenueBooking) => {
				const startAtObj = new Date(vb.startAt)
				const queryKey = venueBookingsQueryKey(startAtObj)
				queryClient.refetchQueries(['venueBookings', queryKey])
			},
		}
	)

	const onSubmitBooking = useCallback(
		({
			startAtDate,
			startAtTime,
			endAtDate,
			endAtTime,
			venue,
			...others
		}: Record<string, unknown>) => {
			const startAtObj = new Date(`${startAtDate}T${startAtTime}`)
			const endAtObj = new Date(`${endAtDate}T${endAtTime}`)

			// Validate startAt and endAt
			if (endAtObj < startAtObj) {
				setError('endAtDate', {
					message: '結束日期不能比開始日期還早。',
				})
				setError('endAtTime', {
					message: ' ',
				})
				return
			}

			venueBookingMutation
				.mutateAsync({
					startAt: `${startAtDate}T${startAtTime}`,
					endAt: `${endAtDate}T${endAtTime}`,
					venue: venue as Venue,
					...others,
				} as VenueBooking)
				.then(() => {
					setIsNewVBModalOpened(false)
				})
		},
		[venueBookingMutation]
	)

	return (
		<>
			<div className='content'>
				<Row
					style={{
						alignItems: 'flex-end',
					}}
				>
					<Col xs={12} sm={7}>
						<FormGroup>
							<Label>篩選</Label>
							<StyledReactSelect<Venue>
								placeholder='全部場地'
								isLoading={venuesQuery.isLoading}
								isSearchable
								isClearable
								options={venuesQuery.data || []}
								getOptionLabel={_venueOptionLabel}
								isOptionSelected={(item) => item.id === activeVenueId}
								onChange={handleChangeVenueFilter}
							/>
						</FormGroup>
					</Col>
					<Col style={{ textAlign: 'right' }}>
						<Button color='primary' onClick={handleToggleNewVBModal}>
							預約場地
						</Button>
					</Col>
				</Row>

				<Calendar
					onMonthChange={handleCalendarMonthChange}
					onSelectEvent={handleCalendarSelectEvent}
					events={venueBookings}
					startAccessor={_startAccessor}
					endAccessor={_endAccessor}
					titleAccessor={_titleAccessor}
					tooltipAccessor={_tooltipAccessor}
					eventPropGetter={_eventPropGetter}
					components={_components}
					style={{ height: 600 }}
					defaultView='week'
				/>
				{/* 
        {venueBookingsQuery.data &&
          venueBookingsQuery.data.map((venueBooking) => (
            <Link to={`/admin/venueBookings/${venueBooking.id}`}>
              <VenueBookingBlock key={venueBooking.id} venueBooking={venueBooking} />
            </Link>
          ))} */}
			</div>

			<Modal size='lg' isOpen={isNewVBModalOpened}>
				<Form onSubmit={handleSubmit(onSubmitBooking)}>
					<ModalHeader toggle={handleToggleNewVBModal}>預約場地</ModalHeader>
					<ModalBody>
						<FormGroup>
							<Label>場地</Label>
							<ReactHookFormController
								control={control}
								name='venue'
								rules={{
									required: '必須選擇',
								}}
								render={({ name, value, onChange }, { invalid }) => (
									<StyledReactSelect<NestedValue<Venue>>
										name={name}
										placeholder='選擇……'
										isLoading={venuesQuery.isLoading}
										isSearchable
										options={venuesQuery.data || []}
										getOptionLabel={_venueOptionLabel}
										isOptionSelected={() => false}
										value={value}
										onChange={onChange}
										isInvalid={invalid}
									/>
								)}
							/>
							{errors.venue && (
								<FormFeedback>{errors.venue?.message}</FormFeedback>
							)}
						</FormGroup>
						<Row form>
							<Col xs={7}>
								<FormGroup>
									<Label>開始日期時間</Label>
									<Input
										name='startAtDate'
										type='date'
										innerRef={register({})}
										invalid={!!errors.startAtDate}
										autoComplete='off'
									/>
									{errors.startAtDate && (
										<FormFeedback>{errors.startAtDate?.message}</FormFeedback>
									)}
								</FormGroup>
							</Col>
							<Col xs={5}>
								<FormGroup>
									<Label>&nbsp;</Label>
									<Input
										name='startAtTime'
										type='time'
										innerRef={register({
											required: '必須填寫',
										})}
										step='300'
										invalid={!!errors.startAtTime}
										autoComplete='off'
									/>
									{errors.startAtTime && (
										<FormFeedback>{errors.startAtTime?.message}</FormFeedback>
									)}
								</FormGroup>
							</Col>
						</Row>
						<Row form>
							<Col xs={7}>
								<FormGroup>
									<Label>結束日期時間</Label>
									<Input
										name='endAtDate'
										type='date'
										innerRef={register({})}
										invalid={!!errors.endAtDate}
										autoComplete='off'
									/>
									{errors.endAtDate && (
										<FormFeedback>{errors.endAtDate?.message}</FormFeedback>
									)}
								</FormGroup>
							</Col>
							<Col xs={5}>
								<FormGroup>
									<Label>&nbsp;</Label>
									<Input
										name='endAtTime'
										type='time'
										innerRef={register({
											required: '必須填寫',
										})}
										step='900'
										invalid={!!errors.endAtTime}
										autoComplete='off'
									/>
									{errors.endAtTime && (
										<FormFeedback>{errors.endAtTime?.message}</FormFeedback>
									)}
								</FormGroup>
							</Col>
						</Row>
						<FormGroup>
							<Label>預約原因</Label>
							<Input
								name='bookingReason'
								type='textarea'
								rows={2}
								innerRef={register({
									required: '必須填寫',
								})}
								invalid={!!errors.bookingReason}
								autoComplete='off'
							/>
							{errors.bookingReason && (
								<FormFeedback>{errors.bookingReason?.message}</FormFeedback>
							)}
						</FormGroup>
					</ModalBody>
					<ModalFooter>
						<Button
							color='primary'
							type='submit'
							isLoading={venueBookingMutation.isLoading}
						>
							提交
						</Button>{' '}
						<Button color='secondary' onClick={handleToggleNewVBModal}>
							取消
						</Button>
					</ModalFooter>
				</Form>
			</Modal>
		</>
	)
}

export default VenueBookings
