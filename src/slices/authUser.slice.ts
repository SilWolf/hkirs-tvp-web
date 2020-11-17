import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types/user.type'

type SliceState = {
  isSignIned: boolean
  jwt?: string
  user?: User
}
const initialState: SliceState = {
  isSignIned: false,
}

const authUserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    signIn: (_, action) => ({
      isSignIned: true,
      jwt: action.payload.jwt,
      user: action.payload.user,
    }),
    signOut: () => ({
      isSignIned: false,
      jwt: undefined,
      user: undefined,
    }),
  },
})

export default authUserSlice
