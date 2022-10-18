import { Input, Space } from 'antd'
import React from 'react'

export const AddItemServices = () => (
	<div>
		<Space direction='vertical'>
			<Input placeholder='Введите наименование' />
			<Input placeholder='Введите код' />
			<Input placeholder='Введите название ИС' />
		</Space>
	</div>
)
