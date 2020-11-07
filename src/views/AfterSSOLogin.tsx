import React, { useState, useEffect } from 'react'
import { useStore } from 'react-redux'
import { useParams, useLocation, Redirect } from 'react-router-dom'
import { SSOLogin } from '../services/auth.service'
import authUserSlice from '../slices/authUser.slice'

enum StatusEnum {
  Verifying = 0,
  Success,
  Failure,
}

const AfterSSOLogin = () => {
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.Verifying)

  const { provider } = useParams<{ provider: string }>()
  const { search } = useLocation()
  const { dispatch } = useStore()

  useEffect(() => {
    if (dispatch && provider && search) {
      SSOLogin(provider, search)
        .then(({ jwt, user }) => {
          dispatch(
            authUserSlice.actions.login({
              jwt,
              data: user,
            })
          )
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
    return <Redirect to="/admin/dashboard" />
  }

  if (status === StatusEnum.Failure) {
    return <Redirect to="/login" />
  }

  return <></>
}

export default AfterSSOLogin
