import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { Component } from 'react'

type Item = {
	key: string
	serverName: string
	purpose: string
	employeeName: string
	serviceName: string
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
		title: 'Наименование ИС',
		dataIndex: 'serviceName',
		key: 'serviceName',
	},
	{
		title: 'Имя сервера',
		dataIndex: 'serverName',
		key: 'serverName',
	},
	{
		title: 'Назначение',
		dataIndex: 'purpose',
		key: 'purpose',
	},
	{
		title: 'Сопроваждающий',
		dataIndex: 'employeeName',
		key: 'employeeName',
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
		title: 'Наименование ИС',
		dataIndex: 'serviceName',
		key: 'serviceName',
	},
	{
		title: 'Имя сервера',
		dataIndex: 'serverName',
		key: 'serverName',
	},
	{
		title: 'Назначение',
		dataIndex: 'purpose',
		key: 'purpose',
	},
	{
		title: 'Сопроваждающий',
		dataIndex: 'employeeName',
		key: 'employeeName',
	},
]

export default class TabsContentInfSystems extends Component<{}, State> {
	state = {
		items: [],
		isAuth: true,
	}

	componentDidMount() {
		this.backFunc()
	}

	async requestAPI() {
		return fetch(`http://localhost:1337/api/information-systems-tables`).then((data) => data.json())
	}

	async backFunc() {
		const items: Item[] = []
		const response: Response = await this.requestAPI()
		response.data.forEach((item) => {
			items.push({
				key: item.attributes.key,
				serviceName: item.attributes.serviceName,
				serverName: item.attributes.serverName,
				purpose: item.attributes.purpose,
				employeeName: item.attributes.employeeName,
			})
		})
		this.setState({ items })
	}

	render() {
		const { items } = this.state
		return <Table columns={this.state.isAuth ? columnsIsAuth : columnsIsNotAuth} dataSource={items} />
	}
}
