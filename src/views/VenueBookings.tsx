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
	venue: NestedValue<Venue> | undefined
}

const bookingStartAt = startOfHour(new Date())
const bookingEndAt = addHours(bookingStartAt, 1)
const bookingDefaultValues: VenueBookingDTO = {
	venue: undefined,
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
				.filter((vb) => (activeVenueId ? vb.id === activeVenueId : true)),
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

	const {
		control,
		register,
		handleSubmit,
		watch,
		errors,
		formState,
		reset,
	} = useForm<VenueBookingDTO>({
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
		}: VenueBookingDTO) => {
			venueBookingMutation
				.mutateAsync({
					startAt: `${startAtDate}T${startAtTime}`,
					endAt: `${endAtDate}T${endAtTime}`,
					venue: venue as Venue,
					...others,
				})
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
				/>
				{/* 
        {venueBookingsQuery.data &&
          venueBookingsQuery.data.map((venueBooking) => (
            <Link to={`/admin/venueBookings/${venueBooking.id}`}>
              <VenueBookingBlock key={venueBooking.id} venueBooking={venueBooking} />
            </Link>
          ))} */}
			</div>

			<Modal
				size='lg'
				isOpen={isNewVBModalOpened}
				toggle={handleToggleNewVBModal}
			>
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
						<FormGroup>場地</FormGroup>
						<FormGroup>開始時間</FormGroup>
						<FormGroup>結束時間</FormGroup>
						<FormGroup>預約原因</FormGroup>
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
