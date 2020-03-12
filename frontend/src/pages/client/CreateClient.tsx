import React, { Fragment } from 'react'
import CreateClientContainer from '../../containers/client/CreateClientContainer'

const CreateClient = () => (
	<Fragment>
		<h1 className='mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900'>Create Client</h1>
		<div className='container pt-10 mx-auto'>
			<CreateClientContainer />
		</div>
	</Fragment>
)

export default CreateClient
