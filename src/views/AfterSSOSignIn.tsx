import React, { useState, useEffect } from 'react'
import { useStore } from 'react-redux'
import { useParams, useLocation, Redirect } from 'react-router-dom'
import { ssoSignIn } from '../helpers/auth.helper'
import authUserSlice from '../slices/authUser.slice'

enum StatusEnum {
  Verifying = 0,
  Success,
  Failure,
}

const AfterSSOSignIn = () => {
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.Verifying)

  const { provider } = useParams<{ provider: string }>()
  const { search } = useLocation()
  const { dispatch } = useStore()

  useEffect(() => {
    if (dispatch && provider && search) {
      ssoSignIn(provider, search)
        .then(() => {
          setStatus(StatusEnum.Success)
        })
        .catch(() => {
          setStatus(StatusEnum.Failure)
        })
    }
  }, [dispatch, provider, search])

  if (status === StatusEnum.Verifying) {
    return <div>Loading...</div>
  }

  if (status === StatusEnum.Success) {
    return <Redirect to="/student" />
  }

  if (status === StatusEnum.Failure) {
    return <Redirect to="/auth/sign-in" />
  }

  return <></>
}

export default AfterSSOSignIn
