import { Button, Modal } from 'antd'
import React, { useState, useEffect } from 'react'
// import { AddItemInfSystems } from './AddItemPanel/AddItemInfSystems'
import AddItemStaff from './AddItemPanel/AddItemStaff'
// import { AddItemServers } from './AddItemPanel/AddItemServers'
// import { AddItemSoftware } from './AddItemPanel/AddItemSoftware'
// import { AddItemServices } from './AddItemPanel/AddItemServices'
import { ResponseSingle, StaffItem } from '../Tabs/TabsComponents/TabsContent/TabsContentStaff'
import { useDispatch } from 'react-redux'
import { pushNewItemToStaffData } from '../../store/content'

type Props = {
	changedTab: string
}

async function addItem(data: any) {
	const response = await fetch(`http://localhost:1337/api/staff-tables`, {
		method: 'POST',
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

const AddItemModal = ({ changedTab }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const dispatch = useDispatch()

	const [data, setData] = useState<any>(undefined)

	const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id } = event.target

		setData({ ...data, [id]: event.target.value })
		console.log(data)
	}

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		addItem(data).then((resp: ResponseSingle) => {
			switch (changedTab) {
				case '1': {
					const typedData = data as StaffItem
					typedData.id = resp.data.id
					typedData.key = resp.data.id
					dispatch(pushNewItemToStaffData(typedData))
					break
				}

				default: {
					break
				}
			}

			setIsModalOpen(false)
		})
	}

	useEffect(() => {
		if (!isModalOpen) {
			setData(undefined)
		}
	}, [isModalOpen])

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	return (
		<div>
			<Button type='primary' onClick={showModal}>
				Добавление элемента
			</Button>
			<Modal
				title='Добавление элемента'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText='Добавить'
				cancelText='Отмена'
			>
				<div className='sing-in-group'>
					{changedTab === '1' && (
						<AddItemStaff isModalOpen={isModalOpen} data={data} updateData={handleUpdate} />
					)}
					{/* {changedTab === '2' && <AddItemServers />}
					{changedTab === '3' && <AddItemSoftware />}
					{changedTab === '4' && <AddItemServices />}
					{changedTab === '5' && <AddItemInfSystems />} */}
				</div>
			</Modal>
		</div>
	)
}

export default AddItemModal
