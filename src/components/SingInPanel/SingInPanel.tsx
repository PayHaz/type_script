import { UserOutlined } from '@ant-design/icons'
import { Input, Space } from 'antd'
import React, { useState } from 'react'

type Props = {
	updateData: (arg: any) => void
	data: any
}

const SingInPanel: React.FC<Props> = ({ updateData, data }) => {
	return (
		<div>
			<Space direction='horizontal'>
				<Input
					onChange={updateData}
					value={data?.login}
					id='login'
					placeholder='Введите логин'
					prefix={<UserOutlined />}
				/>
				<Input.Password
					onChange={updateData}
					value={data?.passwordHash}
					id='passwordHash'
					placeholder='Введите пароль'
				/>
			</Space>
		</div>
	)
}

export default SingInPanel
