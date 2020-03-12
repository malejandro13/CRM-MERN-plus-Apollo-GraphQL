import React, { Fragment, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_USER } from '../../mutations/UserMutation'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import UserForm from '../../components/user/UserForm'
import idx from 'idx'

const CreateUserContainer = () => {
	let history = useHistory()
	const { register, handleSubmit, errors, watch } = useForm()
	const [ createUser, { error: mutationError, data } ] = useMutation(CREATE_USER)

	//validations
	const [ nameErrorMessage, setNameErrorMessage ] = useState('')
	const [ nameError, setNameError ] = useState(false)
	const [ emailErrorMessage, setEmailErrorMessage ] = useState('')
	const [ emailError, setEmailError ] = useState(false)
	const [ roleErrorMessage, setRoleErrorMessage ] = useState('')
	const [ roleError, setRoleError ] = useState(false)

	useEffect(
		() => {
			const type = idx(data, (_) => _.createUser.__typename)

			if (type === 'UserCreateOrUpdateResultSuccess') history.push('/users')
			if (type === 'UserInvalidInputError') {
				setNameError(idx(data, (_) => _.createUser.nameErrorMessage) ? true : false)
				setNameErrorMessage(idx(data, (_) => _.createUser.nameErrorMessage))
				setEmailError(idx(data, (_) => _.createUser.emailErrorMessage) ? true : false)
				setEmailErrorMessage(idx(data, (_) => _.createUser.emailErrorMessage))
				setRoleError(idx(data, (_) => _.createUser.roleErrorMessage) ? true : false)
				setRoleErrorMessage(idx(data, (_) => _.createUser.roleErrorMessage))
			}
			if (type === 'InternalServerError') alert(idx(data, (_) => _.createUser.message))
		},
		[ data, history ]
	)

	const onSubmit = (data: Record<string, any>) => {
		const input = {
			name: data.name,
			email: data.email,
			password: data.password,
			role: data.role
		}
		createUser({
			variables: { input }
		})
	}

	return (
		<Fragment>
			<UserForm
				register={register}
				onSubmit={handleSubmit(onSubmit)}
				errors={errors}
				watch={watch}
				nameError={nameError}
				nameErrorMessage={nameErrorMessage}
				emailError={emailError}
				emailErrorMessage={emailErrorMessage}
				roleError={roleError}
				roleErrorMessage={roleErrorMessage}
			/>
			{mutationError && <h1>Error: {mutationError.message}</h1>}
		</Fragment>
	)
}

export default CreateUserContainer
