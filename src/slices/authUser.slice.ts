import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types/user.type'

type SliceState = {
  isLogined: boolean
  jwt?: string
  data?: User
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
      data: action.payload.data,
    }),
    logout: () => ({
      isLogined: false,
    }),
  },
})

export default authUserSlice
