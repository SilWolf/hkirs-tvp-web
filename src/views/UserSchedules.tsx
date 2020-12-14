import React from 'react'
import { useAsync } from 'react-async'
import Spinner from 'reactstrap/lib/Spinner'
import PageBrandname from '../components/Page/PageBrand'
import PageTitle from '../components/Page/PageTitle'
import { getUserSchedulesByUserId } from '../helpers/api.helper'
import { UserSchedule } from '../types/user-schedule.type'

import store from '../store'
import { Link } from 'react-router-dom'
import DateSpan from '../components/DateTime/DateSpan'
import TimeSpan from '../components/DateTime/TimeSpan'

const getUserSchedulesFn = ({ userId }: any) => {
  return getUserSchedulesByUserId(userId || 'foo')
}

const UserSchedules = () => {
  // Assume the user id is here
  const userId = store.getState().authUser.user?.id as string

  const userSchedulesAsync = useAsync<UserSchedule[]>({
    promiseFn: getUserSchedulesFn,
    userId,
  })

  if (userSchedulesAsync.isLoading) {
    return (
      <div className="content">
        <Spinner type="grow" color="primary" />
      </div>
    )
  }

  const userSchedules = (userSchedulesAsync.data as UserSchedule[]) || []

  return (
    <>
      <PageTitle>行事曆</PageTitle>
      <PageBrandname>行事曆</PageBrandname>
      <div className="content">
        {userSchedules.map((userSchedule) => {
          return (
            <div key={userSchedule.id}>
              <div>
                <div>
                  <Link to={`/student/user-schedules/${userSchedule.id}`}>
                    <a href="#">{userSchedule.subject}</a>
                  </Link>
                </div>
                <div>
                  <span className="text-mute">
                    <DateSpan date={userSchedule.startAt} />{' '}
                    <TimeSpan date={userSchedule.startAt} /> -
                    <DateSpan date={userSchedule.endAt} />{' '}
                    <TimeSpan date={userSchedule.endAt} />
                  </span>
                </div>
                <div>
                  <span className="text-mute">{userSchedule.content}</span>
                </div>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default UserSchedules
