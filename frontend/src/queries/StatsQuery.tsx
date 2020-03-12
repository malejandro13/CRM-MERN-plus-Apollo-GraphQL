import gql from 'graphql-tag'
export const TOP_TEN_CLIENTS_QUERY = gql`
	query getTopTenClients {
		getTopTenClients {
			__typename
			... on StatsClientResultSuccess {
				code
				success
				message
				topClients {
					total
					client {
						name
					}
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

export const TOP_TEN_SELLERS_QUERY = gql`
	query getTopTenSellers {
		getTopTenSellers {
			__typename
			... on StatsSellerResultSuccess {
				code
				success
				message
				topSellers {
					total
					user {
						name
					}
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
