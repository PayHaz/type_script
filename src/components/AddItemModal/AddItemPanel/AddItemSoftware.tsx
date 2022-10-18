import { Input, Space } from 'antd'
import React from 'react'

export const AddItemSoftware = () => (
	<div>
		<Space direction='vertical'>
			<Input placeholder='Введите наименование' />
			<Input placeholder='Введите версию' />
			<Input placeholder='Введите назначение' />
		</Space>
	</div>
)
