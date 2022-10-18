import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllItemsForStaffData } from '../../../../store/content'
import { RootState } from '../../../../store/store'

export type StaffItem = {
	key: string
	name: string
	contact: string
	jobTitle: string
	address: string
}

type Response = {
	meta: any
	data: {
		attributes: {
			updatedAt: string
			publishedAt: string
			createdAt: string
			locale: string
		} & StaffItem
		id: string
	}[]
}

const columnsIsAuth: ColumnsType<StaffItem> = [
	{
		title: 'ФИО',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a href='/'>{text}</a>,
	},
	{
		title: 'Контакты',
		dataIndex: 'contact',
		key: 'contact',
	},
	{
		title: 'Должность',
		dataIndex: 'jobTitle',
		key: 'jobTitle',
	},
	{
		title: 'Адрес',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Действие',
		dataIndex: '',
		key: 'x',
		render: () => <a href='/'>Удалить</a>,
	},
]

const columnsIsNotAuth: ColumnsType<StaffItem> = [
	{
		title: 'ФИО',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Контакты',
		dataIndex: 'contact',
		key: 'contact',
	},
	{
		title: 'Должность',
		dataIndex: 'jobTitle',
		key: 'jobTitle',
	},
	{
		title: 'Адрес',
		dataIndex: 'address',
		key: 'address',
	},
]

const TabsContentStaff = () => {
	const items = useSelector((store: RootState) => store.content.staffData)
	const dispatch = useDispatch()

	const [isAuth, setIsAuth] = useState(true)

	const requestAPI = () => {
		return fetch(`http://localhost:1337/api/staff-tables`).then((data) => data.json())
	}

	const backFunc = useCallback(async () => {
		const prepared: StaffItem[] = []

		const response: Response = await requestAPI()

		response.data.forEach((item) => {
			prepared.push({
				key: item.id,
				name: item.attributes.name,
				contact: item.attributes.contact,
				jobTitle: item.attributes.jobTitle,
				address: item.attributes.address,
			})
		})

		dispatch(setAllItemsForStaffData(prepared))
	}, [dispatch])

	useEffect(() => {
		backFunc()
	}, [backFunc])

	return <Table columns={isAuth ? columnsIsAuth : columnsIsNotAuth} dataSource={items} />
}

export default TabsContentStaff
