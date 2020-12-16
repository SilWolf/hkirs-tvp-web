import { createSlice } from '@reduxjs/toolkit'

type SliceState = {
  title: string
  brandName: string
}
const initialState: SliceState = {
  title: ' HKIRS師生平台',
  brandName: '我的課程',
}

const pageSlice = createSlice({
  name: 'page',
  initialState: initialState,
  reducers: {
    title: (state, action) => ({
      ...state,
      title: action.payload,
    }),
    brandName: (state, action) => ({
      ...state,
      brandName: action.payload,
    }),
  },
})

export default pageSlice
