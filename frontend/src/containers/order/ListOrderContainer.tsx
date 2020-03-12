import React, { Fragment, useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ORDERS_BY_CLIENT_QUERY } from '../../queries/OrderQuery'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_STATUS_ORDER } from '../../mutations/OrderMutation'
import idx from 'idx'
import Loading from '../../components/Loading'

import OrderCard from '../../components/order/OrderCard'

interface IProduct {
	id: string
	quantity: number
}

interface IOrder {
	id: string
	products: Array<IProduct>
	total: number
	orderDate: string
	client: string
	status: string
}

const ListOrderContainer = ({ client }: { client: string }) => {
	const { loading, data, refetch } = useQuery(ORDERS_BY_CLIENT_QUERY, {
		variables: { client },
		fetchPolicy: 'no-cache'
	})

	const [ updateStatus ] = useMutation(UPDATE_STATUS_ORDER, {
		onCompleted() {
			refetch()
		}
	})

	const [ success, setSuccess ] = useState(false)
	const [ orders, setOrders ] = useState([])

	useEffect(
		() => {
			const successResult = idx(data, (_) => _.getOrdersByClient.success)

			if (successResult) {
				setSuccess(successResult)
				setOrders(idx(data, (_) => _.getOrdersByClient.orders))
			}
		},
		[ data ]
	)

	const updateStatusOrder = (input: any) => {
		updateStatus({
			variables: {
				input
			}
		})
	}

	return (
		<Fragment>
			{loading && <Loading />}
			<div className='flex flex-wrap mx-2'>
				{success && !orders ? (
					<h1 className='w-full px-5 pt-10 text-3xl text-center'>No se encontraron registros</h1>
				) : (
					orders.map((order: IOrder, index: number) => (
						<div key={index} className='flex flex-col items-stretch w-full p-3 sm:w-1/3'>
							<OrderCard
								id={order.id}
								products={order.products}
								total={order.total}
								orderDate={order.orderDate}
								client={order.client}
								status={order.status}
								updateStatusOrder={updateStatusOrder}
							/>
						</div>
					))
				)}
			</div>
		</Fragment>
	)
}

export default ListOrderContainer
