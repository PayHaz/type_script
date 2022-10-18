import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React, { Component } from 'react'

type Item = {
	key: string
	denomination: string
	vesion: string
	purpose: string
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
		dataIndex: 'denomination',
		key: 'denomination',
	},
	{
		title: 'Версия',
		dataIndex: 'vesion',
		key: 'vesion',
	},
	{
		title: 'Назначение',
		dataIndex: 'purpose',
		key: 'purpose',
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
		dataIndex: 'denomination',
		key: 'denomination',
	},
	{
		title: 'Версия',
		dataIndex: 'vesion',
		key: 'vesion',
	},
	{
		title: 'Назначение',
		dataIndex: 'purpose',
		key: 'purpose',
	},
]

export default class TabsContentSoftware extends Component<{}, State> {
	state = {
		items: [],
		isAuth: true,
	}

	componentDidMount() {
		this.backFunc()
	}

	async requestAPI() {
		return fetch(`http://localhost:1337/api/softwares`).then((data) => data.json())
	}

	async backFunc() {
		const items: Item[] = []
		const response: Response = await this.requestAPI()
		response.data.forEach((item) => {
			items.push({
				key: item.attributes.key,
				denomination: item.attributes.denomination,
				vesion: item.attributes.vesion,
				purpose: item.attributes.purpose,
			})
		})
		this.setState({ items })
	}

	render() {
		const { items } = this.state
		return <Table columns={this.state.isAuth ? columnsIsAuth : columnsIsNotAuth} dataSource={items} />
	}
}
