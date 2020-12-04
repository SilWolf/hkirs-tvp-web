import { StrapiFile } from './strapi/StrapiFile.type'

export type User = {
  id: string
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  role: UserRole
  protrait: UserProtrait
}

export type UserRole = {
  name: string
  description: string
  type: string
}

export type UserProtrait = StrapiFile
