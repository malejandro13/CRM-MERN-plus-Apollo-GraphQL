import React, { Fragment } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_PRODUCT } from '../../mutations/ProductMutation'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import ProductForm from '../../components/product/ProductForm'

const CreateProductContainer = () => {
	let history = useHistory()
	const { register, handleSubmit, errors } = useForm()
	const [ createProduct, { error: mutationError } ] = useMutation(CREATE_PRODUCT, {
		onCompleted() {
			history.push('/products')
		}
	})

	const onSubmit = (data: Record<string, any>) => {
		const input = { ...data, price: Number(data.price), stock: Number(data.stock) }

		createProduct({
			variables: { input }
		})
	}

	return (
		<Fragment>
			<ProductForm register={register} onSubmit={handleSubmit(onSubmit)} errors={errors} />
			{mutationError && <h1>Error: {mutationError.message}</h1>}
		</Fragment>
	)
}

export default CreateProductContainer
