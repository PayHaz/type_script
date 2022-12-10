import { UserOutlined } from '@ant-design/icons'
import { Input, Space } from 'antd'
import React, { useState } from 'react'

type Props = {
	updateData: (arg: any) => void
}

const SingInPanel: React.FC<Props> = ({ updateData }) => {
	return (
		<div>
			<Space direction='horizontal'>
				<Input onChange={updateData} id='login' placeholder='Введите логин' prefix={<UserOutlined />} />
				<Input.Password onChange={updateData} id='passwrodHash' placeholder='Введите пароль' />
			</Space>
		</div>
	)
}

export default SingInPanel
