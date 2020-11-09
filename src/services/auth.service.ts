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
  forgotPassword,
  resetPassword,
}
