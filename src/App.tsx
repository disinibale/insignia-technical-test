import { useState } from 'react'
import './Assets/Styles/App.css'
import { useSelector } from 'react-redux'
import { RootState } from './Store'

import { Button } from './Components/Buttons'
import Navs from './Components/Navs/index';
import { MenuInterface } from './Interfaces/Components/index';
import Cards from './Components/Cards'
import Modals from './Components/Modals'

function App() {
	const page = useSelector((state: RootState) => state.page.name)
	const [isModalActive, setIsModalActive] = useState(false)
	const menu: MenuInterface[] = [
		{
			name: 'Home',
			component: <Button label='Home' color='success' rounded />
		},
		{
			name: 'Customers',
			component: 'This is Customers'
		},
		{
			name: 'Travel Packages',
			component: 'This is Travel Packages'
		},
		{
			name: 'Orders',
			component: 'This is Orders'
		},
		{
			name: 'Order Details',
			component: 'This or Order Details'
		},
	]
	return (
		<>
			<Navs menu={menu} />
			{menu.map((item, index) => {
				if (item.name === page) {
					return (
						<div className='m-8' key={index}>
							<Cards>{item.component}</Cards>
						</div>
					)
				}
			})}
		</>
	)
}

export default App;
