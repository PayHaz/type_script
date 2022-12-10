import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import SingInPanel from '../SingInPanel/SingInPanel'

import './SingInModal.css'

async function authorization(data: any) {
	const response = await fetch(`http://localhost:1337/auth/local`, {
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
	if (response.ok) {
		console.log('все чётенько')
	}
	return response
}

const SingInModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [data, setData] = useState<any>(undefined)
	var md5 = require('md5')

	const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id } = event.target
		if (id === 'passwrodHash') {
			setData({ ...data, [id]: md5(event.target.value) })
		} else setData({ ...data, [id]: event.target.value })
		console.log(data)
	}

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		authorization(data)
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	return (
		<div>
			<Button type='primary' onClick={showModal}>
				Вход
			</Button>
			<Modal
				title='Вход'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText='Войти'
				cancelText='Назад'
			>
				<div className='sing-in-group'>
					<SingInPanel updateData={handleUpdate} />
				</div>
			</Modal>
		</div>
	)
}

export default SingInModal
