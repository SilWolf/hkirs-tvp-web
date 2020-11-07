import { createSlice } from '@reduxjs/toolkit'
import { User } from '../types/user.type'

type SliceState = {
  isLogined: boolean
  data?: User
}
const initialState: SliceState = {
  isLogined: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: (_, action) => ({
      isLogined: true,
      data: action.payload,
    }),
    logout: () => ({
      isLogined: false,
    }),
  },
})

export default userSlice
