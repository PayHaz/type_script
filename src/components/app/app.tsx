import React, { useEffect } from 'react'
import TabsComponents from '../Tabs/TabsComponents/TabsComponents'
import { useDispatch } from 'react-redux'
import { setToken } from '../../store/token'
import './app.css'
import 'antd/dist/antd.min.css'
import Cookies from 'universal-cookie'
import { isAuth } from '../../store/authorization'

const App = () => {
	const cookies = new Cookies()
	const dispatch = useDispatch()
	useEffect(() => {
		const token = cookies.get('token')
		if (token) {
			dispatch(setToken(token))
			dispatch(isAuth(true))
		}
	})
	return (
		<div>
			<div className='tabs-group'>
				<TabsComponents />
			</div>
		</div>
	)
}

export default App
