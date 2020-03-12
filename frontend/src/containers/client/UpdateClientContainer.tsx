import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_CLIENT } from '../../mutations/ClientMutation'
import { useForm, useFieldArray } from 'react-hook-form'

import { useHistory } from 'react-router-dom'
import ClientForm from '../../components/client/ClientForm'

const UpdateClientContainer = ({ client: { id, name, surname, company, age, type, emails } }: any) => {
	let history = useHistory()

	const { register, control, handleSubmit, errors } = useForm({
		defaultValues: {
			name,
			surname,
			company,
			age,
			type,
			emails
		}
	})

	const { fields, append, remove } = useFieldArray({ control, name: 'emails' })

	const [ updateClient ] = useMutation(UPDATE_CLIENT, {
		onCompleted() {
			history.push('/clients')
		}
	})

	const onSubmit = (data: any) => {
		const input = { ...data, age: Number(data.age), id }

		updateClient({
			variables: { input }
		})
	}

	const handleClick = (e: React.SyntheticEvent<any, Event>) => {
		e.preventDefault()
		append({ name: 'emails' })
	}

	return (
		<ClientForm
			register={register}
			onSubmit={handleSubmit(onSubmit)}
			onClick={handleClick}
			errors={errors}
			fields={fields}
			remove={remove}
		/>
	)
}

export default UpdateClientContainer
