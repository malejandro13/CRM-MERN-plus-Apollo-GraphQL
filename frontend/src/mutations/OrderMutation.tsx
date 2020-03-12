import gql from 'graphql-tag'

export const CREATE_ORDER = gql`
	mutation createOrder($input: OrderRegisterInput) {
		createOrder(input: $input) {
			__typename
			... on OrderResultSuccess {
				code
				success
				message
				order {
					id
				}
			}
			... on OrderInvalidInputError {
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

export const UPDATE_STATUS_ORDER = gql`
	mutation updateStatusOrder($input: OrderStatusUpdateInput) {
		updateStatusOrder(input: $input) {
			... on OrderResultSuccess {
				code
				success
				message
				order {
					id
					status
				}
			}
			... on OrderStatusInvalidInputError {
				code
				success
				message
				statusErrorMessage
			}
			... on InternalServerError {
				code
				success
				message
			}
		}
	}
`
