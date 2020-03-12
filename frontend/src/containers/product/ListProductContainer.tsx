import React, { Fragment, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { PRODUCTS_QUERY } from '../../queries/ProductQuery'
import { DELETE_PRODUCT } from '../../mutations/ProductMutation'
import idx from 'idx'

import Loading from '../../components/Loading'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import editIcon from '@iconify/icons-entypo/edit'
import trashIcon from '@iconify/icons-entypo/trash'
import controllerRecord from '@iconify/icons-entypo/controller-record'

import Table from '../../components/Table'

interface IProduct {
	id: string
	name: string
	price: number
	stock: number
}

const ListProductContainer = () => {
	const [ limit ] = useState(5)
	const [ since, setSince ] = useState(0)
	const [ gtStock ] = useState(-1)
	const [ page, setPage ] = useState(1)

	const [ productsRow, setProductsRow ] = useState([])
	const [ totalProduct, setTotalProduct ] = useState(0)
	const [ headers ] = useState([ { title: 'Name' }, { title: 'Price' }, { title: 'Stock' }, { title: 'Actions' } ])

	const { loading, error, data, refetch } = useQuery(PRODUCTS_QUERY, {
		variables: {
			limit,
			since,
			gtStock
		},
		fetchPolicy: 'no-cache'
	})
	const [ deleteProduct ] = useMutation(DELETE_PRODUCT, {
		onCompleted() {
			refetch()
		}
	})

	useEffect(
		() => {
			const handleClick = (id: string) => (e: React.SyntheticEvent<any, Event>) => {
				e.preventDefault()
				if (window.confirm('Are you sure you want to delete product?')) {
					deleteProduct({
						variables: { id }
					})
				}
			}

			const typename = idx(data, (_) => _.getProducts.__typename)

			const getColor = (stock: number) => {
				if (stock === 0) return 'red-500'
				if (stock <= 50) return 'yellow-500'

				return 'green-500'
			}

			if (data && typename === 'ProductsResultSuccess') {
				let rowData: any = []
				setTotalProduct(data.totalProductCount.total)
				data.getProducts.products.forEach(({ id, name, price, stock }: IProduct) => {
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
						actions: (
							<Fragment>
								<Link to={`/product/edit/${id}`}>
									<Icon
										className='inline-block w-5 h-5 mx-1 text-gray-500 fill-current hover:text-teal-500'
										icon={editIcon}
									/>
								</Link>
								<div className='inline-block' onClick={handleClick(id)}>
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
			}
		},
		[ data, deleteProduct, refetch ]
	)

	return (
		<Fragment>
			{loading && <Loading />}
			{error && <h1>Error: {error.message}</h1>}
			{totalProduct !== 0 ? (
				<div className='rounded-lg sm:shadow-lg'>
					<Table data={productsRow} headers={headers} />
					<div className='flex justify-between mb-10 bg-gray-200 rounded-b-lg'>
						<div
							className={`text-sm text-gray-700 text-center px-4 py-2 m-2 font-bold select-none ${page ===
							1
								? 'cursor-not-allowed'
								: 'cursor-pointer'}`}
							onClick={() => {
								if (page !== 1) {
									setSince(since - limit)
									setPage(page - 1)
								}
							}}
						>
							Previous
						</div>
						<div className='self-center text-sm text-gray-700 select-none'>{`Page ${page} of ${Math.ceil(
							totalProduct / limit
						)}`}</div>
						<div
							className={`text-sm text-gray-700 text-center px-4 py-2 m-2 font-bold select-none ${page ===
							Math.ceil(totalProduct / limit)
								? 'cursor-not-allowed'
								: 'cursor-pointer'}`}
							onClick={() => {
								if (page !== Math.ceil(totalProduct / limit)) {
									setSince(since + limit)
									setPage(page + 1)
								}
							}}
						>
							Next
						</div>
					</div>
				</div>
			) : null}
		</Fragment>
	)
}

export default ListProductContainer
