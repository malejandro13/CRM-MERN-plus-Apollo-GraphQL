import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_PRODUCT } from '../../mutations/ProductMutation'
import { useForm } from 'react-hook-form'

import { useHistory } from 'react-router-dom'
import ProductForm from '../../components/product/ProductForm'

const UpdateProductContainer = ({ product: { id, name, price, stock } }: any) => {
	let history = useHistory()

	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			name,
			price,
			stock
		}
	})

	const [ updateProduct ] = useMutation(UPDATE_PRODUCT, {
		onCompleted() {
			history.push('/products')
		}
	})

	const onSubmit = (data: any) => {
		const input = { ...data, price: Number(data.price), stock: Number(data.stock), id }

		updateProduct({
			variables: { input }
		})
	}
	return <ProductForm register={register} onSubmit={handleSubmit(onSubmit)} errors={errors} />
}

export default UpdateProductContainer
