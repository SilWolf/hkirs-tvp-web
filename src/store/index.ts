import authUserSlice from '../slices/authUser.slice'
import pageSlice from '../slices/page.slice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
	reducer: {
		authUser: authUserSlice.reducer,
		page: pageSlice.reducer,
	},
})

export default store

export type RootState = ReturnType<typeof store.getState>
