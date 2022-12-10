/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllItemsForStaffData, updateItemForStaffData } from '../../../../store/content'
import { RootState } from '../../../../store/store'
import { deleteItemForStaffData } from '../../../../store/content'
import { nanoid } from 'nanoid'

export type StaffItem = {
	id: string
	key: string
	name: string
	contact: string
	jobTitle: string
	address: string
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean
	dataIndex: string
	title: any
	inputType: 'number' | 'text'
	record: StaffItem
	index: number
	children: React.ReactNode
}
const EditableCell: React.FC<EditableCellProps> = ({
	editing,
	dataIndex,
	title,
	inputType,
	record,
	index,
	children,
	...restProps
}) => {
	const inputNode = inputType === 'number' ? <InputNumber /> : <Input />

	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{ margin: 0 }}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					{inputNode}
				</Form.Item>
			) : (
				children
			)}
		</td>
	)
}

export type Response = {
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

export type ResponseSingle = {
	meta: any
	data: {
		attributes: {
			updatedAt: string
			publishedAt: string
			createdAt: string
			locale: string
		} & StaffItem
		id: string
	}
}

const TabsContentStaff = () => {
	const items = useSelector((store: RootState) => store.content.staffData)
	const user = useSelector((store: RootState) => store.authorization.value)
	const dispatch = useDispatch()
	const [editingKey, setEditingKey] = useState('')
	const [form] = Form.useForm()
	const isEditing = (record: StaffItem) => record.key === editingKey

	const edit = (record: Partial<StaffItem> & { key: React.Key }) => {
		form.setFieldsValue({ name: '', age: '', address: '', ...record })
		setEditingKey(record.key)
	}

	const cancel = () => {
		setEditingKey('')
	}

	const save = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as StaffItem
			const newData = [...items]
			const index = newData.findIndex((item) => key === item.key)
			if (index > -1) {
				const item = newData[index]
				newData.splice(index, 1, {
					...item,
					...row,
				})
				updateItem(row, item.id).then(() => {
					console.log(newData)
					dispatch(updateItemForStaffData(newData))
				})
				setEditingKey('')
			} else {
				setEditingKey('')
			}
		} catch (errInfo) {
			console.log('Validate Failed:', errInfo)
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isAuth, setIsAuth] = useState(false)

	async function deleteItem(id: string) {
		fetch(`http://localhost:1337/api/staff-tables/` + id, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).catch((error) => {
			console.log('error = ' + error)
		})
		console.log({ id })
	}

	async function updateItem(data: any, id: any) {
		const response = await fetch(`http://localhost:1337/api/staff-tables/` + id, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				data,
			}),
		})
			.then((response) => response.json())
			.catch((error) => {
				console.log('error = ' + error)
			})
		return response
	}

	const columnsIsAuth = [
		{
			title: 'ФИО',
			dataIndex: 'name',
			key: 'name',
			width: 350,
			editable: true,
			//render: (text) => <a href='/'>{text}</a>,
		},
		{
			title: 'Контакты',
			dataIndex: 'contact',
			key: 'contact',
			width: 350,
			editable: true,
		},
		{
			title: 'Должность',
			dataIndex: 'jobTitle',
			key: 'jobTitle',
			width: 350,
			editable: true,
		},
		{
			title: 'Адрес',
			dataIndex: 'address',
			key: 'address',
			width: 350,
			editable: true,
		},
		{
			title: 'Редактирование',
			dataIndex: 'operation',
			width: 100,
			render: (_: any, record: StaffItem) => {
				const editable = isEditing(record)
				return editable ? (
					<span>
						<Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
							Сохранить
						</Typography.Link>
						<Popconfirm title='Вы уверены?' onConfirm={cancel}>
							<a>Отменить</a>
						</Popconfirm>
					</span>
				) : (
					<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
						Редактировать
					</Typography.Link>
				)
			},
		},
		{
			title: 'Удаление',
			dataIndex: 'delete',
			key: 'delete',
			width: 100,
			render: (_: any, record: { id: string }) =>
				items.length >= 1 ? (
					<Popconfirm
						title='Вы уверены?'
						okText='Удалить'
						cancelText='Отмена'
						onConfirm={() => {
							deleteItem(record.id).then(() => {
								dispatch(deleteItemForStaffData(record.id))
							})
						}}
					>
						<a>Удалить</a>
					</Popconfirm>
				) : null,
		},
	]

	const mergedColumns = columnsIsAuth.map((col) => {
		if (!col.editable) {
			return col
		}
		return {
			...col,
			onCell: (record: StaffItem) => ({
				record,
				inputType: col.dataIndex === 'age' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		}
	})

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

	const requestAPI = () => {
		return fetch(`http://localhost:1337/api/staff-tables`).then((data) => data.json())
	}

	const backFunc = useCallback(async () => {
		const prepared: StaffItem[] = []

		const response: Response = await requestAPI()

		response.data.forEach((item) => {
			prepared.push({
				key: nanoid(),
				id: item.id,
				name: item.attributes.name,
				contact: item.attributes.contact,
				jobTitle: item.attributes.jobTitle,
				address: item.attributes.address,
			})
		})
		dispatch(setAllItemsForStaffData(prepared))
		console.log(isAuth)
	}, [dispatch])

	useEffect(() => {
		backFunc()
	}, [backFunc])

	return (
		<Form form={form} component={false}>
			<Table
				columns={user > 0 ? mergedColumns : columnsIsNotAuth}
				dataSource={items}
				rowClassName='editable-row'
				pagination={{
					onChange: cancel,
				}}
				components={{
					body: {
						cell: EditableCell,
					},
				}}
			/>
		</Form>
	)
}

export default TabsContentStaff
