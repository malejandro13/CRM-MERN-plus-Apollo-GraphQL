import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import usersIcon from '@iconify/icons-entypo/users'
import shoppingBag from '@iconify/icons-entypo/shopping-bag'
import menuIcon from '@iconify/icons-entypo/menu'
import cricleWithCross from '@iconify/icons-entypo/circle-with-cross'
import barGraph from '@iconify/icons-entypo/bar-graph'
import userIcon from '@iconify/icons-entypo/user'
import logOut from '@iconify/icons-entypo/log-out'
import { useHistory } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'

const Header = ({ isAuth, userRole }: { isAuth: boolean; userRole: string }) => {
	let history = useHistory()
	const [ showMenu, setShowMenu ] = useState(false)
	const client = useApolloClient()
	const handleClick = (toLink: string | null) => (e: React.SyntheticEvent<any, Event>) => {
		e.preventDefault()
		setShowMenu(!showMenu)
		if (toLink !== null) history.push(toLink)
	}

	const signOff = () => {
		localStorage.removeItem('token')
		client.resetStore()
		setShowMenu(!showMenu)
		history.push('/signin')
	}

	return (
		<Fragment>
			<div className='flex flex-wrap content-center justify-between w-full h-16 px-5 bg-indigo-900 sm:px-10'>
				<Link to='/' className='text-lg text-white'>
					CRM
				</Link>

				{isAuth ? (
					<div onClick={handleClick(null)}>
						<Icon
							className='inline-block w-6 h-10 text-white cursor-pointer stroke-current'
							icon={menuIcon}
						/>
					</div>
				) : null}
			</div>
			{isAuth && (
				<div
					className={`fixed inset-y-0 right-0 z-10 h-full bg-indigo-900 duration-300 ${showMenu
						? 'w-full sm:w-56'
						: 'w-0'}`}
				>
					<div className={`${showMenu ? 'visible' : 'hidden'}`}>
						<div onClick={handleClick(null)}>
							<Icon
								className='inline-block w-6 h-6 mt-3 ml-3 text-white cursor-pointer stroke-current'
								icon={cricleWithCross}
							/>
						</div>
						<h2 className='mt-4 text-3xl text-center text-white'>Menu</h2>
						<ul className='mt-4'>
							<li
								className='px-4 py-2 text-white cursor-pointer hover:bg-gray-800'
								onClick={handleClick('/clients')}
							>
								<Icon className='inline-block w-5 h-5 fill-current ' icon={usersIcon} />
								<p className='inline-block ml-2 align-middle'>Clients</p>
							</li>

							<li
								className='px-4 py-2 text-white cursor-pointer hover:bg-gray-800'
								onClick={handleClick('/products')}
							>
								<Icon className='inline-block w-5 h-5 fill-current ' icon={shoppingBag} />
								<p className='inline-block ml-2 align-middle'>Products</p>
							</li>

							<li
								className='px-4 py-2 text-white cursor-pointer hover:bg-gray-800'
								onClick={handleClick('/panel')}
							>
								<Icon className='inline-block w-5 h-5 fill-current ' icon={barGraph} />
								<p className='inline-block ml-2 align-middle'>Stats</p>
							</li>
							{userRole === 'ADMINISTRATOR' ? (
								<li
									className='px-4 py-2 text-white cursor-pointer hover:bg-gray-800'
									onClick={handleClick('/users')}
								>
									<Icon className='inline-block w-5 h-5 fill-current ' icon={userIcon} />
									<p className='inline-block ml-2 align-middle'>Users</p>
								</li>
							) : null}
							<li className='px-4 py-2 text-white cursor-pointer hover:bg-gray-800' onClick={signOff}>
								<Icon className='inline-block w-5 h-5 fill-current ' icon={logOut} />
								<p className='inline-block ml-2 align-middle'>Sign off</p>
							</li>
						</ul>
					</div>
				</div>
			)}
		</Fragment>
	)
}

export default Header
