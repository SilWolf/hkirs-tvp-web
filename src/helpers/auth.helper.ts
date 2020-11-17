import { User } from '../types/user.type'
import api from '../services/api.service'
import store from '../store'
import authUserSlice from '../slices/authUser.slice'

const AUTH_USER_LOCALSTORAGE_KEY = 'tocc-player-panel:authUser'
type AuthUserInfo = {
  jwt?: string
  user?: User
  isSignIned: boolean
}

export const signIn = (identifier: string, password: string) => {
  return api
    .post<{
      jwt: string
      user: User
    }>('/auth/local', {
      identifier,
      password,
    })
    .then((authUserData) => {
      resolveSignIn({ ...authUserData, isSignIned: true })
      return authUserData
    })
}

export const ssoSignIn = (providerName: string, query: string) => {
  return api
    .get<{
      jwt: string
      user: User
    }>(`/auth/${providerName}/callback${query}`)
    .then((authUserData) => {
      resolveSignIn({ ...authUserData, isSignIned: true })
      return authUserData
    })
}

export const resolveSignIn = (authUserData: AuthUserInfo) => {
  store.dispatch(authUserSlice.actions.signIn(authUserData))
  putAuthUserToLocalStorage(authUserData)
}

export const signOut = () => {
  store.dispatch(authUserSlice.actions.signOut())
  removeAuthUserFromLocalStorage()
}

export const signUp = (email: string, password: string) => {
  return api.post('/auth/local/register', {
    username: email,
    email,
    password,
  })
}

export const sendEmailConfirmation = (email: string) => {
  return api.post('/auth/send-email-confirmation', {
    email,
  })
}

export const forgotPassword = (email: string) => {
  return api.post('/auth/forgot-password', {
    email,
  })
}

export const resetPassword = (
  code: string,
  password: string,
  passwordConfirmation: string
) => {
  return api.post('/auth/reset-password', {
    code,
    password,
    passwordConfirmation,
  })
}

export const putAuthUserToLocalStorage = (authUserInfo: AuthUserInfo): void => {
  localStorage.setItem(AUTH_USER_LOCALSTORAGE_KEY, JSON.stringify(authUserInfo))
}

export const getAuthUserFromLocalStorage = (): AuthUserInfo | null => {
  const str = localStorage.getItem(AUTH_USER_LOCALSTORAGE_KEY)
  if (str) {
    return JSON.parse(str) as AuthUserInfo
  }
  return null
}

export const removeAuthUserFromLocalStorage = (): void => {
  return localStorage.removeItem(AUTH_USER_LOCALSTORAGE_KEY)
}

export const tryAutoSignIn = (): void => {
  const authUser = getAuthUserFromLocalStorage()
  if (authUser) {
    resolveSignIn(authUser)
  }
}

export default {
  signIn,
  signUp,
  ssoSignIn,
  forgotPassword,
  resetPassword,
  getAuthUserFromLocalStorage,
  putAuthUserToLocalStorage,
  removeAuthUserFromLocalStorage,
  tryAutoSignIn,
}
