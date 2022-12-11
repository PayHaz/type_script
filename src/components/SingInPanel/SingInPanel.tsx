import { UserOutlined } from '@ant-design/icons'
import { Input, Space, Form } from 'antd'
import React from 'react'

type Props = {
	updateData: (arg: any) => void
	data: any
}

const SingInPanel: React.FC<Props> = ({ updateData, data }) => {
	return (
		<div>
			<Space direction='horizontal'>
				<Form.Item name='login' rules={[{ required: true, message: 'Пожалуйста, введите логин' }]}>
					<Input
						onChange={updateData}
						value={data?.login}
						id='login'
						placeholder='Введите логин'
						prefix={<UserOutlined />}
					/>
				</Form.Item>
				<Form.Item name='passwordHash' rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}>
					<Input.Password
						onChange={updateData}
						value={data?.passwordHash}
						id='passwordHash'
						placeholder='Введите пароль'
					/>
				</Form.Item>
			</Space>
		</div>
	)
}

export default SingInPanel
