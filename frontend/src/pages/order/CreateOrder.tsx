import React, { Fragment, useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import CreateOrderContainer from '../../containers/order/CreateOrderContainer'
import { useQuery } from '@apollo/react-hooks'
import { CLIENT_QUERY } from '../../queries/ClientQuery'
import { PRODUCTS_QUERY } from '../../queries/ProductQuery'
import idx from 'idx'
import Loading from '../../components/Loading'
import ClientCard from '../../components/client/ClientCard'

type TParams = { id: string }

const CreateOrder = ({ match }: RouteComponentProps<TParams>) => {
	const id = match.params.id
	const { loading, data } = useQuery(CLIENT_QUERY, {
		variables: { id },
		fetchPolicy: 'no-cache'
	})
	const { data: dataProducts } = useQuery(PRODUCTS_QUERY, {
		variables: { gtStock: 0 },
		fetchPolicy: 'no-cache'
	})

	const [ client, setClient ] = useState(<Fragment />)
	const [ clientCard, setClientCard ] = useState(<Fragment />)
	const [ nameClient, setNameClient ] = useState('')

	useEffect(
		() => {
			const abortController = new AbortController()
			const typename = idx(data, (_) => _.getClient.__typename)

			if (data && dataProducts) {
				if (typename === 'NotFoundError' || typename === 'InternalServerError')
					setClient(<h1>Error: {data.getClient.message}</h1>)
				else {
					setClient(
						<CreateOrderContainer
							clientID={data.getClient.client.id}
							products={dataProducts.getProducts.products}
						/>
					)
					setNameClient(data.getClient.client.name)
					setClientCard(<ClientCard client={data.getClient.client} />)
				}
			}
			return () => abortController.abort()
		},
		[ data, dataProducts ]
	)

	return (
		<Fragment>
			{loading && <Loading />}
			<h1 className='mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900'>
				New Order for {nameClient}
			</h1>
			<div className='flex flex-wrap pt-10 mx-auto sm:px-10'>
				<div className='w-full px-2 sm:w-1/4'>{clientCard}</div>
				<div className='w-full bg-white rounded-lg shadow-lg sm:w-3/4'>{client}</div>
			</div>
		</Fragment>
	)
}

export default CreateOrder
