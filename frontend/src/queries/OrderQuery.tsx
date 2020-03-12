import gql from 'graphql-tag'
export const ORDERS_BY_CLIENT_QUERY = gql`
	query getOrdersByClient($client: ID!) {
		getOrdersByClient(client: $client) {
			__typename
			... on OrdersResultSuccess {
				code
				success
				message
				orders {
					id
					products {
						id
						quantity
					}
					total
					orderDate
					client
					status
				}
			}
			... on InternalServerError {
				code
				success
				message
			}
		}
	}
`
