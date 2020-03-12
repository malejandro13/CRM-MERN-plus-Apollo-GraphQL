import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import ListClientContainer from '../../containers/client/ListClientContainer'
import Button from '../../components/Button'

const ListClient = () => (
	<Fragment>
		<h1 className='mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900'>Client List</h1>

		<div className='w-full px-2 pt-10 mx-auto sm:w-4/5'>
			<div className='flex flex-col mx-2 my-4'>
				<Link to='/client/create' className='self-end'>
					<Button
						type='submit'
						title='Create Client'
						bgColor='transparent'
						hoverBgColor='teal-500'
						textColor='teal-500'
						hoverTextColor='white'
						borderColor='teal-500'
					/>
				</Link>
			</div>
			<ListClientContainer />
		</div>
	</Fragment>
)

export default ListClient
