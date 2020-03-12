import React, { Fragment, useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import UpdateProductContainer from '../../containers/product/UpdateProductContainer'
import { useQuery } from '@apollo/react-hooks'
import { PRODUCT_QUERY } from '../../queries/ProductQuery'
import idx from 'idx'
import Loading from '../../components/Loading'

type TParams = { id: string }

const UpdateProduct = ({ match }: RouteComponentProps<TParams>) => {
	const id = match.params.id
	const { loading, data, error } = useQuery(PRODUCT_QUERY, {
		variables: { id }
	})
	const [ product, setProduct ] = useState(<Fragment />)

	useEffect(
		() => {
			const abortController = new AbortController()
			const typename = idx(data, (_) => _.getProduct.__typename)
			if (data) {
				if (typename === 'NotFoundError') setProduct(<h1>Error: {data.getProduct.message}</h1>)
				else setProduct(<UpdateProductContainer product={data.getProduct.product} />)
			}
			return () => abortController.abort()
		},
		[ data ]
	)

	if (error) return <h1>Error: {error.message}</h1>

	return (
		<Fragment>
			{loading && <Loading />}
			<h1 className='mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900'>Update Product</h1>
			<div className='container pt-10 mx-auto'>{product}</div>
		</Fragment>
	)
}

export default UpdateProduct
