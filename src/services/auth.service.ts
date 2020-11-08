import { User } from '../types/user.type'
import api from './api.service'

export const signIn = (identifier: string, password: string) => {
  return api.post<{
    jwt: string
    user: User
  }>('/auth/local', {
    identifier,
    password,
  })
}

export const signUp = (email: string, password: string) => {
  return api
    .post('/auth/local/register', {
      username: email,
      email,
      password,
    })
    .then(() => {
      return api.post('/auth/send-email-confirmation', {
        email,
      })
    })
}

export const forgetPassword = (email: string) => {
  return api.post('/auth/local/forget-password', {
    email,
  })
}

export const resetPassword = (
  code: string,
  password: string,
  passwordConfirmation: string
) => {
  return api.post('/auth/local/reset-password', {
    code,
    password,
    passwordConfirmation,
  })
}

export const ssoSignIn = (providerName: string, query: string) => {
  return api.get<{
    jwt: string
    user: User
  }>(`/auth/${providerName}/callback${query}`)
}

export default {
  signIn,
  signUp,
  ssoSignIn,
  forgetPassword,
  resetPassword,
}
