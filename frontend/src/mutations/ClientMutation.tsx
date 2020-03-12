import gql from 'graphql-tag'

export const CREATE_CLIENT = gql`
	mutation createClient($input: ClientRegisterInput) {
		createClient(input: $input) {
			__typename
			... on ClientCreateOrUpdateResultSuccess {
				code
				success
				message
				client {
					id
					name
					surname
				}
			}
			... on ClientInvalidInputError {
				code
				success
				message
				nameErrorMessage
				surnameErrorMessage
				companyErrorMessage
				ageErrorMessage
				typeErrorMessage
			}
			... on InternalServerError {
				code
				success
				message
			}
		}
	}
`

export const UPDATE_CLIENT = gql`
	mutation updateClient($input: ClientUpdateInput) {
		updateClient(input: $input) {
			__typename
			... on ClientCreateOrUpdateResultSuccess {
				code
				success
				message
				client {
					id
					name
					surname
					age
					emails {
						email
					}
				}
			}
			... on ClientInvalidInputError {
				code
				success
				message
				nameErrorMessage
				surnameErrorMessage
				companyErrorMessage
				ageErrorMessage
				typeErrorMessage
			}
			... on InternalServerError {
				code
				success
				message
			}
		}
	}
`

export const DELETE_CLIENT = gql`
	mutation deleteClient($id: ID!) {
		deleteClient(id: $id) {
			__typename
			... on ClientResultSuccess {
				code
				success
				message
				client {
					id
					name
					surname
				}
			}
			... on NotFoundError {
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
