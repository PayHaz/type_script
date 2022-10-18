import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { Component } from 'react'

type Item = {
	key: string
	serviceName: string
	code: number
	informationSystems: string
}

type State = {
	items: Item[]
}

type Response = {
	meta: any
	data: {
		attributes: {
			updatedAt: string
			publishedAt: string
			createdAt: string
			locale: string
		} & Item
		id: string
	}[]
}

const columnsIsAuth: ColumnsType<Item> = [
	{
		title: 'Наименование',
		dataIndex: 'serviceName',
		key: 'serviceName',
	},
	{
		title: 'Код',
		dataIndex: 'code',
		key: 'code',
	},
	{
		title: 'Информационная система',
		dataIndex: 'informationSystems',
		key: 'informationSystems',
	},
	{
		title: 'Действие',
		dataIndex: '',
		key: 'x',
		render: () => <a href='/'>Удалить</a>,
	},
]

const columnsIsNotAuth: ColumnsType<Item> = [
	{
		title: 'Наименование',
		dataIndex: 'serviceName',
		key: 'serviceName',
	},
	{
		title: 'Код',
		dataIndex: 'code',
		key: 'code',
	},
	{
		title: 'Информационная система',
		dataIndex: 'informationSystems',
		key: 'informationSystems',
	},
]

export default class TabsContentServices extends Component<{}, State> {
	state = {
		items: [],
		isAuth: true,
	}

	componentDidMount() {
		this.backFunc()
	}

	async requestAPI() {
		return fetch(`http://localhost:1337/api/services-tables`).then((data) => data.json())
	}

	async backFunc() {
		const items: Item[] = []
		const response: Response = await this.requestAPI()
		response.data.forEach((item) => {
			items.push({
				key: item.attributes.key,
				serviceName: item.attributes.serviceName,
				code: item.attributes.code,
				informationSystems: item.attributes.informationSystems,
			})
		})
		this.setState({ items })
	}

	render() {
		const { items } = this.state
		return <Table columns={this.state.isAuth ? columnsIsAuth : columnsIsNotAuth} dataSource={items} />
	}
}
