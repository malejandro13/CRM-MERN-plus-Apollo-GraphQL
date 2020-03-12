import React, { Fragment, useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import UpdateClientContainer from '../../containers/client/UpdateClientContainer'
import { useQuery } from '@apollo/react-hooks'
import { CLIENT_QUERY } from '../../queries/ClientQuery'
import idx from 'idx'
import Loading from '../../components/Loading'

type TParams = { id: string }

const UpdateClient = ({ match }: RouteComponentProps<TParams>) => {
	const id = match.params.id
	const { loading, data, error } = useQuery(CLIENT_QUERY, {
		variables: { id }
	})
	const [ client, setClient ] = useState(<Fragment />)

	useEffect(
		() => {
			const abortController = new AbortController()
			const typename = idx(data, (_) => _.getClient.__typename)
			if (data) {
				if (typename === 'NotFoundError' || typename === 'UnauthorizedError')
					setClient(<h1>Error: {data.getClient.message}</h1>)
				else setClient(<UpdateClientContainer client={data.getClient.client} />)
			}
			return () => abortController.abort()
		},
		[ data ]
	)

	if (error) return <h1>Error: {error.message}</h1>

	return (
		<Fragment>
			{loading && <Loading />}
			<h1 className='mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900'>Update Client</h1>
			<div className='container pt-10 mx-auto'>{client}</div>
		</Fragment>
	)
}

export default UpdateClient
