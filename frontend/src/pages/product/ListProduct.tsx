import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import ListProductContainer from '../../containers/product/ListProductContainer'
import Button from '../../components/Button'

const ListProduct = () => (
	<Fragment>
		<h1 className='mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900'>Product List</h1>

		<div className='w-full px-2 pt-10 mx-auto sm:w-2/3'>
			<div className='flex flex-col mx-2 my-4'>
				<Link to='/product/create' className='self-end'>
					<Button
						type='submit'
						title='Create Product'
						bgColor='transparent'
						hoverBgColor='teal-500'
						textColor='teal-500'
						hoverTextColor='white'
						borderColor='teal-500'
					/>
				</Link>
			</div>
			<ListProductContainer />
		</div>
	</Fragment>
)

export default ListProduct
