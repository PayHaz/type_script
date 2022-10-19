import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StaffItem } from '../components/Tabs/TabsComponents/TabsContent/TabsContentStaff'

interface CounterState {
	staffData: StaffItem[]
}

const initialState: CounterState = {
	staffData: [],
}

type Key = String

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
		deleteItemForStaffData: (state, item: PayloadAction<Key>) => {
			let index = 0

			state.staffData.forEach((el, idx) => {
				if (el.key === item.payload) {
					index = idx
				}
			})

			const newStaffData = [...state.staffData.slice(0, index), ...state.staffData.slice(index + 1)]
			console.log('индекс удаляемого:', index)

			state.staffData = newStaffData
		},
	},
})

export const { pushNewItemToStaffData, setAllItemsForStaffData, deleteItemForStaffData } = contentSlice.actions

export default contentSlice.reducer
