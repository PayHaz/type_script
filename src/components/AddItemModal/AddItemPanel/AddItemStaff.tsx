import { Input, Space } from 'antd'
import React from 'react'

type Props = {
	updateData: (arg: any) => void
	data: any
	isModalOpen: boolean
}

const AddItemStaff: React.FC<Props> = ({ updateData, data }) => {
	return (
		<div>
			<Space direction='vertical'>
				<Input value={data?.name} id='name' placeholder='Введите ФИО' onChange={updateData} />
				<Input value={data?.contact} id='contact' placeholder='Введите контакты' onChange={updateData} />
				<Input value={data?.jobTitle} id='jobTitle' placeholder='Введите должность' onChange={updateData} />
				<Input value={data?.address} id='address' placeholder='Введите адрес' onChange={updateData} />
			</Space>
		</div>
	)
}

export default AddItemStaff
