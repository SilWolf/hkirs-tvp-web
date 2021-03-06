import React from 'react'
import { useAsync } from 'react-async'

import { UserEvent } from '../types/user-event.type'

import { getUserEventsByUserId } from '../helpers/api.helper'

import Badge from 'reactstrap/lib/Badge'
import Spinner from 'reactstrap/lib/Spinner'
import DatetimeSpan from '../components/DateTime/DatetimeSpan'
import PageBrandname from '../components/Page/PageBrand'
import PageTitle from '../components/Page/PageTitle'

import store from '../store'

const getUserEventsFn = ({ userId }: any) => {
	return getUserEventsByUserId(userId)
}

const UserEvents = () => {
	// Assume the user id is here
	const userId = store.getState().authUser.user?.id as string

	const classesAsync = useAsync<UserEvent[]>({
		promiseFn: getUserEventsFn,
		userId,
	})

	if (classesAsync.isLoading) {
		return (
			<div className='content'>
				<Spinner type='grow' color='primary' />
			</div>
		)
	}

	const classes = classesAsync.data as UserEvent[]

	return (
		<>
			<PageTitle>活動</PageTitle>
			<PageBrandname>活動</PageBrandname>
			<div className='content'>
				{classes.map((userEvent) => {
					return (
						<div key={userEvent.id}>
							<Badge color='primary'>{userEvent.type}</Badge>
							<div>
								<strong className='text-mute'>
									<DatetimeSpan dateOrDateString={userEvent.startAt} />
								</strong>
							</div>
							<div>
								<span className='text-mute'>{userEvent.description}</span>
							</div>
							<hr />
						</div>
					)
				})}
			</div>
		</>
	)
}

export default UserEvents
