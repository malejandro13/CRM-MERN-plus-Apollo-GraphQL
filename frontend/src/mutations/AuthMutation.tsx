import gql from 'graphql-tag'

export const SIGNIN_AUTH = gql`
	mutation loginUser($input: UserLoginInput) {
		loginUser(input: $input) {
			__typename
			... on UserLoginResultSuccess {
				code
				success
				message
				user {
					email
				}
				token
			}
			... on UserInvalidInputError {
				code
				success
				message
				loginErrorMessage
			}
			... on InternalServerError {
				code
				success
				message
			}
		}
	}
`
