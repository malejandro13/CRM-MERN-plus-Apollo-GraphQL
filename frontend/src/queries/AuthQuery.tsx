import gql from 'graphql-tag'
export const USER_TOKEN_QUERY = gql`
	query getUserToken {
		getUserToken {
			__typename
			... on UserTokenResultSuccess {
				success
				message
				user {
					id
					name
					email
					role
				}
			}
			... on UnauthorizedError {
				message
			}
			... on InternalServerError {
				success
				message
			}
		}
	}
`
