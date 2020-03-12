import gql from 'graphql-tag'

export const CREATE_USER = gql`
	mutation createUser($input: UserRegisterInput) {
		createUser(input: $input) {
			__typename
			... on UserCreateOrUpdateResultSuccess {
				message
			}
			... on UserInvalidInputError {
				message
				nameErrorMessage
				emailErrorMessage
				passwordErrorMessage
				roleErrorMessage
			}
			... on UnauthorizedError {
				message
			}
			... on InternalServerError {
				message
			}
		}
	}
`

export const DELETE_USER = gql`
	mutation deleteUser($id: ID!) {
		deleteUser(id: $id) {
			__typename
			... on UserResultSuccess {
				message
			}
			... on NotFoundError {
				message
			}
			... on InternalServerError {
				message
			}
			... on UnauthorizedError {
				message
			}
		}
	}
`
