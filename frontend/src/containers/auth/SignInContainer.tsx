import React, { Fragment, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { SIGNIN_AUTH } from '../../mutations/AuthMutation'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import SignInForm from '../../components/auth/SignInForm'
import idx from 'idx'

const SignInContainer = ({ refetch }: any) => {
	let history = useHistory()
	const { register, handleSubmit, errors } = useForm()
	const [ signIn, { error: mutationError, data } ] = useMutation(SIGNIN_AUTH)

	const [ loginErrorMessage, setLoginErrorMessage ] = useState('')
	const [ loginError, setLoginError ] = useState(false)

	useEffect(
		() => {
			const fetchResource = async () => {
				const type = idx(data, (_) => _.loginUser.__typename)
				if (type === 'UserLoginResultSuccess') {
					localStorage.setItem('token', idx(data, (_) => _.loginUser.token))
					await refetch()

					history.push('/panel')
				}
				if (type === 'UserInvalidInputError') {
					setLoginError(idx(data, (_) => _.loginUser.loginErrorMessage) ? true : false)
					setLoginErrorMessage(idx(data, (_) => _.loginUser.loginErrorMessage))
				}
				if (type === 'InternalServerError') alert(idx(data, (_) => _.loginUser.message))
			}
			fetchResource()
		},
		[ data, refetch, history ]
	)

	const onSubmit = (data: Record<string, any>) => {
		const input = {
			email: data.email,
			password: data.password
		}

		signIn({
			variables: { input }
		})
	}

	return (
		<Fragment>
			<SignInForm
				register={register}
				onSubmit={handleSubmit(onSubmit)}
				errors={errors}
				loginError={loginError}
				loginErrorMessage={loginErrorMessage}
			/>
			{mutationError && <h1>Error: {mutationError.message}</h1>}
		</Fragment>
	)
}

export default SignInContainer
