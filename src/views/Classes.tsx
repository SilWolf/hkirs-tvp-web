import React from 'react'
import { useAsync } from 'react-async'
import Spinner from 'reactstrap/lib/Spinner'
import PageBrandname from '../components/Page/PageBrand'
import PageTitle from '../components/Page/PageTitle'
import { getClassesByUserId } from '../helpers/api.helper'
import { Cls } from '../types/class.type'

import store from '../store'
import { Link } from 'react-router-dom'

const getClassesFn = ({ userId }: any) => {
  return getClassesByUserId(userId)
}

const Classes = () => {
  // Assume the user id is here
  const userId = store.getState().authUser.user?.id as string

  const classesAsync = useAsync<Cls[]>({
    promiseFn: getClassesFn,
    userId,
  })

  if (classesAsync.isLoading) {
    return (
      <div className="content">
        <Spinner type="grow" color="primary" />
      </div>
    )
  }

  const classes = classesAsync.data as Cls[]

  return (
    <>
      <PageTitle>我的課程</PageTitle>
      <PageBrandname>我的課程</PageBrandname>
      <div className="content">
        {classes.map((cls) => {
          return (
            <div key={cls.id}>
              <div>
                <div>
                  <Link to={`./classes/${cls.id}`}>
                    <a href="#">{cls.code}</a>
                  </Link>
                </div>
                <div>
                  <span className="text-mute">
                    {cls.startDate} - {cls.endDate}
                  </span>
                </div>
                <div>
                  <span className="text-mute">{cls.course.name}</span>
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

export default Classes
