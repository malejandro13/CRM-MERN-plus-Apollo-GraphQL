import React, { Fragment } from 'react'
import SignInContainer from '../../containers/auth/SignInContainer'
import { Redirect } from 'react-router-dom'

const SignIn = ({ isAuth, refetch }: any) => {
	if (isAuth) return <Redirect to='/panel' />
	return (
		<Fragment>
			<div className='container pt-10 mx-auto'>
				<SignInContainer refetch={refetch} />
			</div>
		</Fragment>
	)
}

export default SignIn
