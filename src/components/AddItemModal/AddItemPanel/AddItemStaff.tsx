import { Input, Space } from 'antd'
import React, { Component } from 'react'

export default class AddItemStaff extends Component<{
	updateData: (arg: any) => void
	data: any
}> {
	constructor(props: any) {
		super(props)
		this.handleChangeName = this.handleChangeName.bind(this)
		this.handleChangeContact = this.handleChangeContact.bind(this)
		this.handleChangeJobTitile = this.handleChangeJobTitile.bind(this)
		this.handleChangeAddress = this.handleChangeAddress.bind(this)
	}
	state = {
		name: '',
		jobTitle: '',
		address: '',
		contact: '',
	}

	async handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
		const { value } = event.target

		this.setState({ name: value })
		this.props.updateData({ ...this.props.data, name: value })
	}

	async handleChangeContact(event: React.ChangeEvent<HTMLInputElement>) {
		const { value } = event.target

		this.setState({ contact: value })
		this.props.updateData({ ...this.props.data, contact: value })
	}

	async handleChangeJobTitile(event: React.ChangeEvent<HTMLInputElement>) {
		const { value } = event.target

		this.setState({ jobTitle: value })
		this.props.updateData({ ...this.props.data, jobTitle: value })
	}

	async handleChangeAddress(event: React.ChangeEvent<HTMLInputElement>) {
		const { value } = event.target

		this.setState({ address: value })
		this.props.updateData({ ...this.props.data, address: value })
	}

	render() {
		return (
			<div>
				<Space direction='vertical'>
					<Input placeholder='Введите ФИО' onChange={this.handleChangeName} />
					<Input placeholder='Введите контакты' onChange={this.handleChangeContact} />
					<Input placeholder='Введите должность' onChange={this.handleChangeJobTitile} />
					<Input placeholder='Введите адрес' onChange={this.handleChangeAddress} />
				</Space>
			</div>
		)
	}
}
