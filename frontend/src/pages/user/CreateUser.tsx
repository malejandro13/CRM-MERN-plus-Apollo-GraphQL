import React, { Fragment } from 'react'
import CreateUserContainer from '../../containers/user/CreateUserContainer'
import { Redirect } from 'react-router-dom'

const CreateUser = ({ userRole }: { userRole: string }) => {
	if (userRole !== 'ADMINISTRATOR') return <Redirect to='/clients' />
	return (
		<Fragment>
			<h1 className='mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900'>Create User</h1>
			<div className='container pt-10 mx-auto'>
				<CreateUserContainer />
			</div>
		</Fragment>
	)
}

export default CreateUser
