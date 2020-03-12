import React, { Fragment, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CLIENTS_QUERY } from '../../queries/ClientQuery'
import { DELETE_CLIENT } from '../../mutations/ClientMutation'
import idx from 'idx'

import Loading from '../../components/Loading'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import editIcon from '@iconify/icons-entypo/edit'
import trashIcon from '@iconify/icons-entypo/trash'
import shoppingCart from '@iconify/icons-entypo/shopping-cart'
import shoppingBag from '@iconify/icons-entypo/shopping-bag'

import Table from '../../components/Table'

const ListClientContainer = () => {
	const [ limit ] = useState(5)
	const [ since, setSince ] = useState(0)
	const [ page, setPage ] = useState(1)

	const [ clientsRow, setClientsRow ] = useState([])
	const [ totalClient, setTotalClient ] = useState(0)
	const [ headers ] = useState([ { title: 'Name' }, { title: 'Company' }, { title: 'Actions' } ])

	const { loading, error, data, refetch } = useQuery(CLIENTS_QUERY, {
		variables: {
			limit,
			since
		},
		fetchPolicy: 'no-cache'
	})
	const [ deleteClient ] = useMutation(DELETE_CLIENT, {
		onCompleted() {
			refetch()
		}
	})

	useEffect(
		() => {
			const handleClick = (id: string) => (e: React.SyntheticEvent<any, Event>) => {
				e.preventDefault()
				if (window.confirm('Are you sure you want to delete customer?')) {
					deleteClient({
						variables: { id }
					})
				}
			}

			const typename = idx(data, (_) => _.getClients.__typename)

			if (data && typename === 'ClientsResultSuccess') {
				let rowData: any = []
				setTotalClient(data.totalClientCount.total)
				data.getClients.clients.forEach(
					({
						id,
						name,
						surname,
						age,
						company
					}: {
						id: string
						name: string
						surname: string
						age: number
						company: string
					}) => {
						rowData.push({
							name: (
								<div className='flex items-center'>
									<div className='flex-shrink-0 w-10 h-10'>
										<img
											className='w-10 h-10 rounded-full'
											src='https://www.rosemaryhomes.com/wp-content/uploads/avatar-placeholder-generic-1-300x300.jpg'
											alt=''
										/>
									</div>
									<div className='ml-4'>
										<div className='text-sm font-medium leading-5 text-gray-900'>{`${name} ${surname}`}</div>
										<div className='text-sm leading-5 text-gray-500'>{`${age} years old`}</div>
									</div>
								</div>
							),
							company: <div className='text-sm leading-5 text-gray-900'>{company}</div>,
							actions: (
								<Fragment>
									<Link to={`/order/create/${id}`}>
										<Icon
											className='inline-block w-5 h-5 mx-1 text-gray-500 fill-current hover:text-teal-500'
											icon={shoppingCart}
										/>
									</Link>
									<Link to={`/orders/${id}`}>
										<Icon
											className='inline-block w-5 h-5 mx-1 text-gray-500 fill-current hover:text-teal-500'
											icon={shoppingBag}
										/>
									</Link>
									<Link to={`/client/edit/${id}`}>
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
					}
				)
				setClientsRow(rowData)
			}
		},
		[ data, deleteClient ]
	)

	return (
		<Fragment>
			{loading && <Loading />}
			{error && <h1>Error: {error.message}</h1>}
			{totalClient !== 0 ? (
				<div className='rounded-lg shadow-lg'>
					<Table data={clientsRow} headers={headers} />

					<div className='flex justify-between mb-10 bg-gray-200'>
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
							totalClient / limit
						)}`}</div>
						<div
							className={`text-sm text-gray-700 text-center px-4 py-2 m-2 font-bold select-none ${page ===
							Math.ceil(totalClient / limit)
								? 'cursor-not-allowed'
								: 'cursor-pointer'}`}
							onClick={() => {
								if (page !== Math.ceil(totalClient / limit)) {
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

export default ListClientContainer
