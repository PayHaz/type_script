import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StaffItem } from '../components/Tabs/TabsComponents/TabsContent/TabsContentStaff'

interface CounterState {
	staffData: StaffItem[]
}

const initialState: CounterState = {
	staffData: [],
}

export const contentSlice = createSlice({
	name: 'content',
	initialState,
	reducers: {
		pushNewItemToStaffData: (state, item: PayloadAction<StaffItem>) => {
			state.staffData.push(item.payload)
		},
		setAllItemsForStaffData: (state, item: PayloadAction<StaffItem[]>) => {
			state.staffData = item.payload
		},
		// deleteItemForStaffData: (state, item: PayloadAction<StaffItem>) => {
		// 	let index

		// 	state.staffData.forEach((el, idx) => {
		// 		if (el.key === item.payload.key) {
		// 			index = idx
		// 		}

		// 		index = -1
		// 	})

		// 	const newStaffData = state.staffData.slice(index, 1)

		// 	state.staffData = newStaffData
		// },
	},
})

export const { pushNewItemToStaffData, setAllItemsForStaffData } = contentSlice.actions

export default contentSlice.reducer
