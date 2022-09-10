import Logo from '../../Assets/Images/logo.png'
import { MenuInterface } from '../../Interfaces/Components/index'
import { useSelector, useDispatch } from 'react-redux'
import { switchPage } from '../../Store/Slices/pageSlice'
import { RootState } from '../../Store';

type Props = {
    menu: MenuInterface[]
}

export default function Navs({
    menu
}: Props) {
    const page = useSelector((state: RootState) => state.page.name)
    const dispatch = useDispatch()
    return (
        <div className='flex flex-row justify-between items-center px-8 bg-gray-200'>
            <img src={Logo} alt='logo' className='w-20 md: py-6' />
            <ul className='flex-row space-x-6 hidden md:flex'>
                {menu.map((el, i) => (
                    <li
                        className=''
                    >
                        <button
                            onClick={(e) => {
                                dispatch(switchPage(el.name))
                            }}
                            className={`
                                        text-lg py-6 font-semibold border-4 hover:border-b-green-500 
                                        ${el.name === page && 'border-b-green-500 '}
                                        `}>
                            {el.name}
                        </button>
                    </li>
                )
                )}
            </ul>
            <button className='block md:hidden'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>

        </div>
    )
}