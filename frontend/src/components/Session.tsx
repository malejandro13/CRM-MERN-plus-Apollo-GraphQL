import React from 'react'
import { Query } from 'react-apollo'
import { USER_TOKEN_QUERY } from '../queries/AuthQuery'

const Session = (Component: any) => (props: any) => (
	<Query query={USER_TOKEN_QUERY}>
		{({ loading, error, data, refetch }: any) => {
			if (loading) return null
			return <Component {...props} refetch={refetch} session={data} />
		}}
	</Query>
)

export default Session
