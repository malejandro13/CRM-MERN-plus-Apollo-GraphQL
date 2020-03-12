import React, { Fragment } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ListOrderContainer from '../../containers/order/ListOrderContainer'

type TParams = { id: string }

const ListOrder = ({ match }: RouteComponentProps<TParams>) => {
	const id = match.params.id

	return (
		<Fragment>
			<h1 className='mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900'>Client Orders</h1>
			<ListOrderContainer client={id} />
		</Fragment>
	)
}

export default ListOrder
