import React, { Fragment } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_CLIENT } from '../../mutations/ClientMutation'
import { useForm, useFieldArray } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import ClientForm from '../../components/client/ClientForm'

const CreateClientContainer = () => {
	let history = useHistory()
	const { register, control, handleSubmit, errors } = useForm({
		defaultValues: {
			emails: [ { email: '' } ]
		}
	})
	const [ createClient, { error: mutationError } ] = useMutation(CREATE_CLIENT, {
		onCompleted() {
			history.push('/clients')
		}
	})
	const { fields, append, remove } = useFieldArray({ control, name: 'emails' })

	const onSubmit = (data: Record<string, any>) => {
		const input = { ...data, age: Number(data.age) }

		createClient({
			variables: { input }
		})
	}

	const handleClick = (e: React.SyntheticEvent<any, Event>) => {
		e.preventDefault()
		append({ name: 'emails' })
	}

	return (
		<Fragment>
			<ClientForm
				register={register}
				onSubmit={handleSubmit(onSubmit)}
				onClick={handleClick}
				errors={errors}
				fields={fields}
				remove={remove}
			/>
			{mutationError && <h1>Error: {mutationError.message}</h1>}
		</Fragment>
	)
}

export default CreateClientContainer
