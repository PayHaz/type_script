import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import SingInPanel from '../SingInPanel/SingInPanel'
import './SingInModal.css'
import { useDispatch, useSelector } from 'react-redux'
import { isAuth } from '../../store/authorization'
import { RootState } from '../../store/store'

let authStatus = 0

async function authorization(data: any, dispatch: any) {
	const response = await fetch(`http://localhost:1337/api/auth/local`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			identifier: data.login,
			password: data.passwordHash,
		}),
	})
		.then((response) => {
			if (response.status === 200) {
				dispatch(isAuth(1))
			}
			if (response.status === 400) {
				dispatch(isAuth(0))
			}
			response.json()
		})
		.catch((error) => {
			console.log('error = ' + error)
			authStatus = 0
		})
	return response
}

const SingInModal = () => {
	const user = useSelector((store: RootState) => store.authorization.value)
	const dispatch = useDispatch()
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
		authorization(data, dispatch)
		//authStatus = 1
		//dispatch(isAuth(authStatus))
		setData(undefined)
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
		console.log(user)
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
					<SingInPanel data={data} updateData={handleUpdate} />
				</div>
			</Modal>
		</div>
	)
}

export default SingInModal
