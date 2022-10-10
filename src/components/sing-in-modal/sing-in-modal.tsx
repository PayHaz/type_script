import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import { SingInPanel } from '../sign-in-panel/sign-in-panel'

import './sing-in-modal.css'

const SingInModal: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
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
					<SingInPanel />
				</div>
			</Modal>
		</div>
	)
}

export default SingInModal
