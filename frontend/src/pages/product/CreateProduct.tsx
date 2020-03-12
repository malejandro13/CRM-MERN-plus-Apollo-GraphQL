import React, { Fragment } from 'react'
import CreateProductContainer from '../../containers/product/CreateProductContainer'

const CreateProduct = () => (
	<Fragment>
		<h1 className='mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900'>Create Product</h1>
		<div className='container pt-10 mx-auto'>
			<CreateProductContainer />
		</div>
	</Fragment>
)

export default CreateProduct
