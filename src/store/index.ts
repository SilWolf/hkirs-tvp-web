import { configureStore } from '@reduxjs/toolkit'

import authUserSlice from '../slices/authUser.slice'

const store = configureStore({
  reducer: {
    authUser: authUserSlice.reducer,
  },
})

export default store
