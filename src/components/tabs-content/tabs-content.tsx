import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { Component } from 'react'

type Item = {
	key: string
	name: string
	contact: string
	jobTitle: string
	address: string
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
		title: 'ФИО',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Контакты',
		dataIndex: 'contact',
		key: 'contact',
	},
	{
		title: 'Должность',
		dataIndex: 'jobTitle',
		key: 'jobTitle',
	},
	{
		title: 'Адрес',
		dataIndex: 'address',
		key: 'address',
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
		title: 'ФИО',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'Контакты',
		dataIndex: 'contact',
		key: 'contact',
	},
	{
		title: 'Должность',
		dataIndex: 'jobTitle',
		key: 'jobTitle',
	},
	{
		title: 'Адрес',
		dataIndex: 'address',
		key: 'address',
	},
]

export default class TabsContent extends Component<{}, State> {
	state = {
		items: [],
		isAuth: true,
	}

	componentDidMount() {
		this.backFunc()
	}

	async requestAPI() {
		return fetch(`http://localhost:1337/api/staff-tables`).then((data) => data.json())
	}

	async backFunc() {
		const items: Item[] = []
		const response: Response = await this.requestAPI()
		response.data.forEach((item) => {
			items.push({
				key: item.attributes.key,
				name: item.attributes.name,
				contact: item.attributes.contact,
				jobTitle: item.attributes.jobTitle,
				address: item.attributes.address,
			})
		})
		this.setState({ items })
	}

	render() {
		const { items } = this.state
		return <Table columns={this.state.isAuth ? columnsIsAuth : columnsIsNotAuth} dataSource={items} />
	}
}
