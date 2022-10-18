import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { Component } from 'react'

type Item = {
	key: string
	ip: string
	serverName: string
	location: string
	belonging: string
	characteristics: string
	denomination: string
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
		title: 'IP',
		dataIndex: 'ip',
		key: 'ip',
	},
	{
		title: 'Имя сервера',
		dataIndex: 'serverName',
		key: 'serverName',
	},
	{
		title: 'Расположение',
		dataIndex: 'location',
		key: 'location',
	},
	{
		title: 'Принадлежность',
		dataIndex: 'belonging',
		key: 'belonging',
	},
	{
		title: 'Характеристики',
		dataIndex: 'characteristics',
		key: 'characteristics',
	},
	{
		title: 'Программное обеспечение',
		dataIndex: 'denomination',
		key: 'denomination',
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
		title: 'IP',
		dataIndex: 'IP',
		key: 'IP',
	},
	{
		title: 'Имя сервера',
		dataIndex: 'serverName',
		key: 'serverName',
	},
	{
		title: 'Расположение',
		dataIndex: 'location',
		key: 'location',
	},
	{
		title: 'Принадлежность',
		dataIndex: 'belonging',
		key: 'belonging',
	},
	{
		title: 'Характеристики',
		dataIndex: 'characteristics',
		key: 'characteristics',
	},
	{
		title: 'Программное обеспечение',
		dataIndex: 'denomination',
		key: 'denomination',
	},
]

export default class TabsContentServers extends Component<{}, State> {
	state = {
		items: [],
		isAuth: true,
	}

	componentDidMount() {
		this.backFunc()
	}

	async requestAPI() {
		return fetch(`http://localhost:1337/api/servers-tables`).then((data) => data.json())
	}

	async backFunc() {
		const items: Item[] = []
		const response: Response = await this.requestAPI()
		response.data.forEach((item) => {
			items.push({
				key: item.attributes.key,
				ip: item.attributes.ip,
				serverName: item.attributes.serverName,
				location: item.attributes.location,
				belonging: item.attributes.belonging,
				characteristics: item.attributes.characteristics,
				denomination: item.attributes.denomination,
			})
		})
		this.setState({ items })
	}

	render() {
		const { items } = this.state
		return <Table columns={this.state.isAuth ? columnsIsAuth : columnsIsNotAuth} dataSource={items} />
	}
}
