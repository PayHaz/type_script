import { Button, Modal, Form } from 'antd'
import React, { useState } from 'react'
import SingInPanel from '../SingInPanel/SingInPanel'
import './SingInModal.css'
import { useDispatch, useSelector } from 'react-redux'
import { isAuth } from '../../store/authorization'
import { RootState } from '../../store/store'
import Cookies from 'universal-cookie'
import { setToken } from '../../store/token'

async function authorization(data: any, dispatch: any, setData: any, setIsModalOpen: any, user: any) {
	const response = await fetch(`http://localhost:1337/api/auth/local`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			identifier: data?.login,
			password: data?.passwordHash,
		}),
	})
	if (response.status === 200) {
		const cookies = new Cookies()
		response.json().then((el: any) => {
			cookies.set('token', el?.jwt)
			dispatch(setToken(el?.jwt))
		})
		dispatch(isAuth(true))
		setData(undefined)
		setIsModalOpen(false)
	} else if (response.status === 400) {
		alert('Неправильно введён логин или пароль!')
	} else {
		alert('Ошибка HTTP: ' + response.status)
	}
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
		authorization(data, dispatch, setData, setIsModalOpen, user)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	return (
		<div>
			<Button type='primary' onClick={showModal}>
				Вход
			</Button>
			<Form
				name='basic'
				initialValues={{
					remember: true,
				}}
				autoComplete='off'
			>
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
			</Form>
		</div>
	)
}

export default SingInModal
