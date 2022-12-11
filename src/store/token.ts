import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
	value: string
}

const initialState = { value: '' } as CounterState

export const tokenSlice = createSlice({
	name: 'token',
	initialState,
	reducers: {
		setToken(state, action: PayloadAction<string>) {
			state.value = action.payload
		},
	},
})

export const { setToken } = tokenSlice.actions

export default tokenSlice.reducer
