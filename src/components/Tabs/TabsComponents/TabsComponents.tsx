import React, { Component } from 'react'
import 'antd/dist/antd.min.css'
import { Tabs } from 'antd'
import SearchPanel from '../../SearchPanel/SearchPanel'
import SingInModal from '../../SingInModal/SingInModal'
import AddItemModal from '../../AddItemModal/AddItemModal'
import TabsContentStaff from './TabsContent/TabsContentStaff'
import TabsContentServers from './TabsContent/TabsContentServers'
import TabsContentSoftware from './TabsContent/TabContentSoftware'
import TabsContentServices from './TabsContent/TabsContentServices'
import TabsContentInfSystems from './TabsContent/TabContentInfSystems'
import './TabsComponents.css'

export default class TabsComponents extends Component {
	state = {
		changedTab: '1',
	}

	onChange = (key: string) => {
		this.setState({ changedTab: key })
		console.log(this.state.changedTab)
	}

	render() {
		return (
			<div>
				<div className='up-group'>
					<SearchPanel />
					<AddItemModal changedTab={this.state.changedTab} />
					<SingInModal />
				</div>
				<Tabs
					defaultActiveKey='1'
					onChange={this.onChange}
					className='tabs'
					items={[
						{
							label: `Сотрудники`,
							key: '1',
							children: <TabsContentStaff />,
						},
						{
							label: `Сервера`,
							key: '2',
							children: <TabsContentServers />,
						},
						{
							label: `Программное обеспечение`,
							key: '3',
							children: <TabsContentSoftware />,
						},
						{
							label: `Услуги`,
							key: '4',
							children: <TabsContentServices />,
						},
						{
							label: `Информационные системы`,
							key: '5',
							children: <TabsContentInfSystems />,
						},
					]}
				/>
			</div>
		)
	}
}
