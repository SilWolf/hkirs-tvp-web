import { User } from '../types/user.type'
import api from './api.service'

export const SSOLogin = (providerName: string, query: string) => {
  return api.get<{
    jwt: string
    user: User
  }>(`/auth/${providerName}/callback${query}`)
}
