import { configureStore } from '@reduxjs/toolkit'
import contentSlice from './content'

export const store = configureStore({
	reducer: {
		content: contentSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
