import { UserOutlined } from '@ant-design/icons'
import { Input, Space } from 'antd'
import React from 'react'

export const SingInPanel = () => (
	<div>
		<Space direction='horizontal'>
			<Input placeholder='Введите логин' prefix={<UserOutlined />} />
			<Input.Password placeholder='Введите пароль' />
		</Space>
	</div>
)
