import React, { useCallback, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory } from 'react-router-dom'
import addMonths from 'date-fns/addMonths'
import endOfMonth from 'date-fns/endOfMonth'
import classnames from 'classnames'

import { ClsLesson } from '../types/cls.type'

import { getClsLessonsByDateRange } from '../helpers/api.helper'

import Calendar from '../components/Calendar/Calendar'

import '../assets/scss/views/ClsLessons.view.scss'

const _titleAccessor = (clsLesson: ClsLesson) =>
	`${clsLesson.cls.code} ${clsLesson.title}`
const _tooltipAccessor = (clsLesson: ClsLesson) =>
	`${clsLesson.cls.code} ${clsLesson.title}`
const _startAccessor = (clsLesson: ClsLesson) => new Date(clsLesson.startAt)
const _endAccessor = (clsLesson: ClsLesson) => new Date(clsLesson.endAt)
const _eventPropGetter = () => {
	return {
		className: classnames(
			'event-clsLesson'
			// `event-clsLesson-status-${clsLesson.status}`
		),
	}
}

const _componentEvent = ({ event: clsLesson }: { event: ClsLesson }) => {
	return (
		<>
			<span className='event-clsLesson-code'>{clsLesson.cls.code}</span>{' '}
			<span className='event-clsLesson-title'>{clsLesson.title}</span>
		</>
	)
}
const _components = {
	event: _componentEvent,
}

const ClsLessons = (): JSX.Element => {
	const queryClient = useQueryClient()
	const history = useHistory()
	const [clsLessonsMap, setClsLessonsMap] = useState<{
		[x: string]: ClsLesson[]
	}>({})

	const clsLessons = useMemo(
		() => Array<ClsLesson>().concat(...Object.values(clsLessonsMap)),
		[clsLessonsMap]
	)

	const handleCalendarMonthChange = useCallback(
		({ start }: { start: Date }) => {
			const prevMonth = addMonths(start, -1)
			const nextMonth = addMonths(start, 1)
			const thisMonth = start

			;[prevMonth, thisMonth, nextMonth].forEach((date) => {
				const queryKey = `${date?.getFullYear()}-${date?.getMonth()}`
				const endOfMonthOfDate = endOfMonth(date)
				if (!clsLessonsMap[queryKey]) {
					queryClient
						.fetchQuery<ClsLesson[]>(
							['clsLessons', queryKey],
							() => getClsLessonsByDateRange(date, endOfMonthOfDate),
							{
								staleTime: 60000,
							}
						)
						.then((clsLessons: ClsLesson[]) => {
							setClsLessonsMap((prev) => ({
								...prev,
								[queryKey]: clsLessons,
							}))
						})
				}
			})
		},
		[clsLessonsMap, queryClient]
	)

	const handleCalendarSelectEvent = useCallback(
		(clsLesson) => {
			history.push(`clses/${clsLesson.cls.id}`)
		},
		[history]
	)

	return (
		<>
			<div className='content'>
				<Calendar
					onMonthChange={handleCalendarMonthChange}
					onSelectEvent={handleCalendarSelectEvent}
					events={clsLessons}
					startAccessor={_startAccessor}
					endAccessor={_endAccessor}
					titleAccessor={_titleAccessor}
					tooltipAccessor={_tooltipAccessor}
					eventPropGetter={_eventPropGetter}
					components={_components}
					style={{ height: 600 }}
				/>
				{/* 
        {clsLessonsQuery.data &&
          clsLessonsQuery.data.map((clsLesson) => (
            <Link to={`/admin/clsLessons/${clsLesson.id}`}>
              <ClsLessonBlock key={clsLesson.id} clsLesson={clsLesson} />
            </Link>
          ))} */}
			</div>
		</>
	)
}

export default ClsLessons
