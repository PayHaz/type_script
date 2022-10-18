import { Input, Space } from 'antd'
import React from 'react'

export const AddItemInfSystems = () => (
	<div>
		<Space direction='vertical'>
			<Input placeholder='Введите наименование ИС' />
			<Input placeholder='Введите имя серва' />
			<Input placeholder='Введите назначение' />
			<Input placeholder='Введите ФИО споровождающего' />
		</Space>
	</div>
)
