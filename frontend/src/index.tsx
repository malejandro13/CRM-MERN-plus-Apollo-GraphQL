import React from 'react'
import ReactDOM from 'react-dom'
import './styles/tailwind.css'

import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionQueryResultData from './fragmentTypes.json'
import { RootSession } from './components/App'
//import * as serviceWorker from './serviceWorker';

const fragmentMatcher = new IntrospectionFragmentMatcher({
	introspectionQueryResultData
})

const cache = new InMemoryCache({ fragmentMatcher })

const client = new ApolloClient({
	uri: `${process.env.REACT_APP_API_URL}`,
	fetchOptions: {
		credentials: 'include'
	},
	request: (operation) => {
		const token = localStorage.getItem('token')
		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : ''
			}
		})
	},
	cache,
	onError: ({ networkError, graphQLErrors }) => {
		console.log('graphQLErrors', graphQLErrors)
		console.log('networkError', networkError)
	}
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<RootSession />
	</ApolloProvider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
