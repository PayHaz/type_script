import authorizationSlice from './authorization'
import { configureStore } from '@reduxjs/toolkit'
import tokenSlice from './token'
import contentSlice from './content'

export const store = configureStore({
	reducer: {
		content: contentSlice,
		authorization: authorizationSlice,
		token: tokenSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
