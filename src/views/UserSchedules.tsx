import React, { useState } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useAsync } from 'react-async'

import { UserSchedule } from '../types/user-schedule.type'

import { getUserSchedulesByUserId } from '../helpers/api.helper'

import Spinner from 'reactstrap/lib/Spinner'
import BigCalendar, {
	BigCalendarEvent,
} from '../components/BigCalendar/BigCalednar'
import PageBrandname from '../components/Page/PageBrand'
import PageTitle from '../components/Page/PageTitle'

import store from '../store'

const getUserSchedulesFn = ({ userId }: any) => {
	return getUserSchedulesByUserId(userId)
}

const UserSchedules = () => {
	// Assume the user id is here
	const userId = store.getState().authUser.user?.id as string

	const [events, setEvents] = useState<BigCalendarEvent[]>([])

	const userSchedulesAsync = useAsync<UserSchedule[]>({
		promiseFn: getUserSchedulesFn,
		userId,
		onResolve: async (data) => {
			setEvents((prevs) => [
				...prevs,
				...data.map((item) => ({
					title: item.subject,
					start: new Date(item.startAt),
					end: new Date(item.endAt),
					allDay: false,
					resource: {
						content: item.content,
					},
				})),
			])
		},
	})

	if (userSchedulesAsync.isLoading) {
		return (
			<div className='content'>
				<Spinner type='grow' color='primary' />
			</div>
		)
	}

	return (
		<>
			<PageTitle>行事曆</PageTitle>
			<PageBrandname>行事曆</PageBrandname>
			<div className='content'>
				<BigCalendar events={events} />
			</div>
		</>
	)
}

export default UserSchedules
