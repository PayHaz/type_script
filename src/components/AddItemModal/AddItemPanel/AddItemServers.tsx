import { Input, Space } from 'antd'
import React from 'react'

export const AddItemServers = () => (
	<div>
		<Space direction='vertical'>
			<Input placeholder='Введите IP' />
			<Input placeholder='Введите имя сервера' />
			<Input placeholder='Введите расположение' />
			<Input placeholder='Введите принадлежность' />
			<Input placeholder='Введите характеристики' />
		</Space>
	</div>
)
