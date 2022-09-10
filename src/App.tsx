import './Assets/Styles/App.css'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { RootState } from './Store'
import { MenuInterface } from './Interfaces/Components/index'
import { ToastContainer } from 'react-toastify'

import Cards from './Components/Cards'
import Navs from './Components/Navs/index'
import Customers from './Screens/Customers'

function App() {
	const page = useSelector((state: RootState) => state.page.name)
	const menu: MenuInterface[] = [
		{
			name: 'Home',
			component: 'THIS IS HOME'
		},
		{
			name: 'Customers',
			component: <Customers />
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
			{/* eslint-disable-next-line */}
			{menu.map((item, index) => {
				if (item.name === page) {
					return (
						<div className='m-8' key={index}>
							<Cards>{item.component}</Cards>
						</div>
					)
				}
			})}
			<ToastContainer />
		</>
	)
}

export default App;
