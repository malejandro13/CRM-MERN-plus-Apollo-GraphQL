import React from 'react'
import { Query } from 'react-apollo'
import { PRODUCT_QUERY } from '../../queries/ProductQuery'

import { Icon } from '@iconify/react'
import chevronDown from '@iconify/icons-entypo/chevron-down'

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
	updateStatusOrder: any
}

const OrderCard = ({ id, products, total, orderDate, client, status, updateStatusOrder }: IOrder) => {
	const dateOrder = new Date(Number(orderDate))
	let classColor: string = ''

	if (status === 'PENDING') classColor = 'yellow'
	if (status === 'CANCELLED') classColor = 'red'
	if (status === 'COMPLETED') classColor = 'green'

	return (
		<div className={`self-auto flex-1 w-full bg-white border-2 border-${classColor}-500 rounded-lg shadow-lg`}>
			<div className={`h-2 bg-${classColor}-500`} />
			<div className='px-2 my-5'>
				<p className='mb-2 text-sm font-bold'>Status:</p>

				<div className='relative mb-2'>
					<select
						className='block w-full px-4 text-sm border rounded-full appearance-none bg-grey-lighter border-grey-lighter text-grey-darker'
						name='status'
						value={status}
						onChange={(e) => {
							let input = {
								id,
								status: e.target.value
							}

							updateStatusOrder(input)
						}}
					>
						<option value='PENDING'>PENDING</option>
						<option value='CANCELLED'>CANCELLED</option>
						<option value='COMPLETED'>COMPLETED</option>
					</select>
					<div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none pin-y pin-r text-grey-darker'>
						<Icon icon={chevronDown} />
					</div>
				</div>

				<p className='mb-2 text-sm font-bold'>
					Order ID:
					<span className='text-sm font-light'> {id}</span>
				</p>

				<p className='mb-2 text-sm font-bold'>
					Order Date:
					<span className='text-sm font-light'> {dateOrder.toLocaleDateString('es-MX')}</span>
				</p>

				<p className={`mb-2 font-bold text-center text-white bg-${classColor}-700 rounded-full text-normal`}>
					Products
				</p>
				{products.map((product: IProduct, index: number) => {
					return (
						<Query key={index} query={PRODUCT_QUERY} variables={{ id: product.id }}>
							{({ loading, error, data }: any) => {
								if (loading) return <p>'Loading...'</p>
								if (error) return <p>'`error: ${error.message}`</p>
								return (
									<div className='px-2 py-2 mb-1 border-2 border-gray-400 rounded-lg'>
										<p className='text-sm font-bold'>
											Name:
											<span className='text-sm font-light'> {data.getProduct.product.name}</span>
										</p>
										<p className='text-sm font-bold'>
											Quantity:
											<span className='text-sm font-light'> {product.quantity}</span>
										</p>
										<p className='text-sm font-bold'>
											Price:
											<span className='text-sm font-light'> {data.getProduct.product.price}</span>
										</p>
									</div>
								)
							}}
						</Query>
					)
				})}
				<div className='flex flex-col pt-5'>
					<p className='self-end mb-2 font-bold text-normal'>
						Total:
						<span className='font-light text-normal'> ${total} CLP</span>
					</p>
				</div>
			</div>
		</div>
	)
}

export default OrderCard
