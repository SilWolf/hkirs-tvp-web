import React, { useCallback, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory, useRouteMatch } from 'react-router-dom'
import addMonths from 'date-fns/addMonths'
import endOfMonth from 'date-fns/endOfMonth'
import classnames from 'classnames'

import { Cls, ClsLesson } from '../types/cls.type'

import { getMyClsesByDateRange } from '../helpers/api.helper'

import Calendar from '../components/Calendar/Calendar'

import '../assets/scss/views/ClsLessons.view.scss'

type ClsLessonDTO = ClsLesson & {
	cls: Cls
}

const _titleAccessor = (clsLesson: ClsLessonDTO) =>
	`${clsLesson.cls.name} ${clsLesson.name}`
const _tooltipAccessor = (clsLesson: ClsLessonDTO) =>
	`${clsLesson.cls.name} ${clsLesson.name}`
const _startAccessor = (clsLesson: ClsLessonDTO) => new Date(clsLesson.startAt)
const _endAccessor = (clsLesson: ClsLessonDTO) => new Date(clsLesson.endAt)
const _eventPropGetter = () => {
	return {
		className: classnames(
			'event-clsLesson'
			// `event-clsLesson-status-${clsLesson.status}`
		),
	}
}

const _componentEvent = ({ event: clsLesson }: { event: ClsLessonDTO }) => {
	return (
		<>
			<span className='event-clsLesson-code'>{clsLesson.cls.name}</span>{' '}
			<span className='event-clsLesson-title'>{clsLesson.name}</span>
		</>
	)
}
const _components = {
	event: _componentEvent,
}

const ClsLessons = (): JSX.Element => {
	const queryClient = useQueryClient()
	const routeMatch = useRouteMatch()
	const history = useHistory()
	const [clsLessonsMap, setClsLessonsMap] = useState<{
		[x: string]: ClsLessonDTO[]
	}>({})

	const clsLessons = useMemo(
		() => Array<ClsLessonDTO>().concat(...Object.values(clsLessonsMap)),
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
						.fetchQuery<Cls[]>(
							['clsLessons', queryKey],
							() => getMyClsesByDateRange(date, endOfMonthOfDate),
							{
								staleTime: 60000,
							}
						)
						.then((clses: Cls[]) => {
							setClsLessonsMap((prev) => ({
								...prev,
								[queryKey]: ([] as ClsLessonDTO[]).concat(
									...clses.map((cls) =>
										cls.lessons.map((clsLesson) => ({ ...clsLesson, cls }))
									)
								),
							}))
						})
				}
			})
		},
		[clsLessonsMap, queryClient]
	)

	const handleCalendarSelectEvent = useCallback(
		(clsLesson) => {
			history.push(`${routeMatch.path}/${clsLesson.cls.id}`)
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
