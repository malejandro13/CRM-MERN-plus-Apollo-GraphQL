import gql from 'graphql-tag'

export const USERS_QUERY = gql`
	query getUsers($limit: Int, $since: Int) {
		getUsers(limit: $limit, since: $since) {
			__typename
			... on UsersResultSuccess {
				message
				users {
					id
					name
					email
					password
					role
				}
			}
			... on UnauthorizedError {
				message
			}
			... on InternalServerError {
				message
			}
		}
		totalUserCount {
			__typename
			... on TotalUsersResultSuccess {
				total
			}
		}
	}
`
