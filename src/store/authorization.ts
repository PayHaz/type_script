import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
	value: number
}

const initialState = { value: 0 } as CounterState

export const authorizationSlice = createSlice({
	name: 'authorization',
	initialState,
	reducers: {
		isAuth(state, action: PayloadAction<number>) {
			state.value += action.payload
		},
	},
})

export const { isAuth } = authorizationSlice.actions

export default authorizationSlice.reducer
