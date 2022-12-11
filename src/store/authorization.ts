import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
	value: boolean
}

const initialState = { value: false } as CounterState

export const authorizationSlice = createSlice({
	name: 'authorization',
	initialState,
	reducers: {
		isAuth(state, action: PayloadAction<boolean>) {
			state.value = action.payload
		},
	},
})

export const { isAuth } = authorizationSlice.actions

export default authorizationSlice.reducer
