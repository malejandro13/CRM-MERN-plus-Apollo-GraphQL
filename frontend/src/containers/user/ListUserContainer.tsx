import React, { Fragment, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { USERS_QUERY } from '../../queries/UserQuery'
import { DELETE_USER } from '../../mutations/UserMutation'
import idx from 'idx'

import Loading from '../../components/Loading'
import { Icon } from '@iconify/react'
import trashIcon from '@iconify/icons-entypo/trash'

import Table from '../../components/Table'

interface IUser {
	id: string
	name: string
	email: string
	role: string
}

const ListUserContainer = () => {
	const [ limit ] = useState(5)
	const [ since, setSince ] = useState(0)
	const [ page, setPage ] = useState(1)

	const [ usersRow, setUsersRow ] = useState([])
	const [ totalUser, setTotalUser ] = useState(0)
	const [ headers ] = useState([ { title: 'Name' }, { title: 'Role' }, { title: 'Actions' } ])

	const { loading, error, data, refetch } = useQuery(USERS_QUERY, {
		variables: {
			limit,
			since
		},
		fetchPolicy: 'no-cache'
	})
	const [ deleteUser ] = useMutation(DELETE_USER, {
		onCompleted() {
			refetch()
		}
	})

	useEffect(
		() => {
			const handleClick = (id: string) => (e: React.SyntheticEvent<any, Event>) => {
				e.preventDefault()
				if (window.confirm('Are you sure you want to delete user?')) {
					deleteUser({
						variables: { id }
					})
				}
			}

			const typename = idx(data, (_) => _.getUsers.__typename)

			if (data && typename === 'UsersResultSuccess') {
				let rowData: any = []
				setTotalUser(data.totalUserCount.total)
				data.getUsers.users.forEach(({ id, name, email, role }: IUser) => {
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
									<div className='text-sm font-medium leading-5 text-gray-900'>{name}</div>
									<div className='text-sm leading-5 text-gray-500'>{email}</div>
								</div>
							</div>
						),
						role: <div className='text-sm leading-5 text-gray-900'>{role}</div>,
						actions: (
							<Fragment>
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
				setUsersRow(rowData)
			}
		},
		[ data, deleteUser ]
	)

	return (
		<Fragment>
			{loading && <Loading />}
			{error && <h1>Error: {error.message}</h1>}
			{totalUser !== 0 ? (
				<div className='rounded-lg shadow-lg'>
					<Table data={usersRow} headers={headers} />

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
							totalUser / limit
						)}`}</div>
						<div
							className={`text-sm text-gray-700 text-center px-4 py-2 m-2 font-bold select-none ${page ===
							Math.ceil(totalUser / limit)
								? 'cursor-not-allowed'
								: 'cursor-pointer'}`}
							onClick={() => {
								if (page !== Math.ceil(totalUser / limit)) {
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

export default ListUserContainer
