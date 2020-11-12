import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types/user.type'

type SliceState = {
  isLogined: boolean
  jwt?: string
  user?: User
}
const initialState: SliceState = {
  isLogined: false,
}

const authUserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: (_, action) => ({
      isLogined: true,
      jwt: action.payload.jwt,
      user: action.payload.user,
    }),
    logout: () => ({
      isLogined: false,
      jwt: undefined,
      user: undefined,
    }),
  },
})

export default authUserSlice
