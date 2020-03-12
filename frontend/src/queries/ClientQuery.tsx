import gql from 'graphql-tag'
export const CLIENTS_QUERY = gql`
	query getClients($limit: Int, $since: Int) {
		getClients(limit: $limit, since: $since) {
			__typename
			... on ClientsResultSuccess {
				code
				success
				message
				clients {
					id
					name
					surname
					age
					company
					emails {
						email
					}
					type
				}
			}
			... on InternalServerError {
				message
			}
		}
		totalClientCount {
			__typename
			... on TotalClientsResultSuccess {
				total
			}
			... on InternalServerError {
				message
			}
		}
	}
`

export const CLIENT_QUERY = gql`
	query getClient($id: ID!) {
		getClient(id: $id) {
			__typename
			... on ClientResultSuccess {
				code
				success
				message
				client {
					id
					name
					surname
					company
					age
					emails {
						email
					}
					type
				}
			}
			... on NotFoundError {
				code
				success
				message
			}
			... on UnauthorizedError {
				code
				success
				message
			}
			... on InternalServerError {
				code
				success
				message
			}
		}
	}
`
