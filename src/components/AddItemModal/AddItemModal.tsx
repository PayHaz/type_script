import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { AddItemInfSystems } from './AddItemPanel/AddItemInfSystems'
import AddItemStaff from './AddItemPanel/AddItemStaff'
import { AddItemServers } from './AddItemPanel/AddItemServers'
import { AddItemSoftware } from './AddItemPanel/AddItemSoftware'
import { AddItemServices } from './AddItemPanel/AddItemServices'
import { StaffItem } from '../Tabs/TabsComponents/TabsContent/TabsContentStaff'
import { useDispatch } from 'react-redux'
import { pushNewItemToStaffData } from '../../store/content'

type Props = {
	changedTab: string
}

async function addItem(data: any) {
	fetch(`http://localhost:1337/api/staff-tables`, {
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
}

const AddItemModal = ({ changedTab }: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const dispatch = useDispatch()

	const [data, setData] = useState<any>(undefined)

	const handleUpdate = (arg: any) => {
		setData(arg)
	}

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
		addItem(data).then(() => {
			switch (changedTab) {
				case '1': {
					const typedData = data as StaffItem
					dispatch(pushNewItemToStaffData(typedData))
					break
				}

				default: {
					break
				}
			}
		})
	}

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
					{changedTab === '1' && <AddItemStaff data={data} updateData={handleUpdate} />}
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
