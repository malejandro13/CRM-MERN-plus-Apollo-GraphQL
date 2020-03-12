import React, { Fragment, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_ORDER } from '../../mutations/OrderMutation'
import { useHistory } from 'react-router-dom'
import idx from 'idx'

import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import OrderForm from '../../components/order/OrderForm'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify/icons-entypo/trash'
import controllerRecord from '@iconify/icons-entypo/controller-record'

interface IProduct {
	id: string
	name: string
	price: number
	stock: number
	quantity: number
}

const CreateOrderContainer = ({ clientID, products }: { clientID: string; products: any }) => {
	let history = useHistory()
	const [ createOrder, { data } ] = useMutation(CREATE_ORDER)

	const [ headers ] = useState([
		{ title: 'Product' },
		{ title: 'Price' },
		{ title: 'Stock' },
		{ title: 'Quantity' },
		{ title: 'Delete' }
	])
	const [ productsRow, setProductsRow ] = useState<Array<IProduct>>([])
	const [ productsOrder, setProductsOrder ] = useState<Array<IProduct>>([])
	const [ totalOrder, setTotalOrder ] = useState(0)

	useEffect(
		() => {
			const type = idx(data, (_) => _.createOrder.__typename)

			if (type === 'OrderResultSuccess') history.push('/clients')
			if (type === 'OrderInvalidInputError' || type === 'InternalServerError') alert(data.createOrder.message)
		},
		[ data, history ]
	)

	useEffect(
		() => {
			const updateTotalOrder = () => {
				let newTotal = 0

				if (productsOrder.length === 0) {
					setTotalOrder(0)
					return
				}

				productsOrder.forEach((product: IProduct) => {
					if (product.quantity) newTotal += product.quantity * product.price
				})

				setTotalOrder(newTotal)
			}

			const deleteProduct = (id: string) => (e: React.SyntheticEvent<any, Event>) => {
				e.preventDefault()
				if (window.confirm('Are you sure you want to delete product?')) {
					let productsDelete = productsOrder.filter((product: IProduct) => product.id !== id)
					setProductsOrder(productsDelete)
				}
			}

			const updateQuantityByInput = (quantity: number, index: number) => {
				productsOrder[index].quantity = quantity
				setProductsOrder(productsOrder)
				updateTotalOrder()
			}

			const getColor = (stock: number) => {
				if (stock === 0) return 'red-500'
				if (stock <= 50) return 'yellow-500'

				return 'green-500'
			}

			let rowData: any = []
			if (productsOrder.length === 0) {
				setProductsOrder(productsOrder)
				setProductsRow(productsOrder)
				setTotalOrder(0)
				return
			}
			productsOrder.forEach(({ id, name, price, stock }: IProduct, index: number) => {
				rowData.push({
					name: <div className='text-sm leading-5 text-gray-900'>{name}</div>,
					price: <div className='text-sm leading-5 text-gray-900'>{price}</div>,
					stock: (
						<div className='flex justify-start'>
							<Icon
								className={`inline-block w-5 h-5 mx-1 text-${getColor(stock)} fill-current`}
								icon={controllerRecord}
							/>
							<div className='text-sm text-gray-900'> {stock}</div>
						</div>
					),
					quantity: (
						<input
							name='quantity'
							type='number'
							placeholder='Quaintity'
							onChange={(e) => {
								if (Number(e.target.value) > stock || Number(e.target.value) < 0) {
									e.target.value = '0'
								}
								updateQuantityByInput(Number(e.target.value), index)
							}}
							min={1}
							max={stock}
							className='w-full'
						/>
					),
					actions: (
						<Fragment>
							<div className='inline-block' onClick={deleteProduct(id)}>
								<Icon
									className='inline-block w-5 h-5 mx-1 text-gray-500 fill-current hover:text-teal-500'
									icon={trashIcon}
								/>
							</div>
						</Fragment>
					)
				})
			})
			setProductsRow(rowData)
			updateTotalOrder()
		},
		[ productsOrder ]
	)

	const selectProduct = (productsSelected: any) => {
		setProductsOrder(productsSelected)
	}

	const submitCreateOrder = () => {
		let productsFilter = productsOrder.map(({ name, price, stock, __typename, ...keepAttrs }: any) => keepAttrs)

		let input = {
			products: productsFilter,
			total: totalOrder,
			client: clientID
		}
		createOrder({
			variables: {
				input
			}
		})
	}

	return (
		<Fragment>
			<Select
				options={products}
				getOptionValue={(options) => options.id}
				getOptionLabel={(options) => options.name}
				closeMenuOnSelect={false}
				components={makeAnimated()}
				isMulti
				placeholder={'Select products'}
				onChange={selectProduct}
				value={productsOrder}
			/>
			{productsRow.length > 0 ? (
				<Fragment>
					<OrderForm productsRow={productsRow} headers={headers} submitCreateOrder={submitCreateOrder} />

					<div className='flex flex-col mx-2 my-4'>
						<p className='self-end'>{`$ ${totalOrder}`}</p>
					</div>
				</Fragment>
			) : null}
		</Fragment>
	)
}

export default CreateOrderContainer
