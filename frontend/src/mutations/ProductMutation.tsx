import gql from 'graphql-tag'

export const CREATE_PRODUCT = gql`
	mutation createProduct($input: ProductRegisterInput) {
		createProduct(input: $input) {
			__typename
			... on ProductCreateOrUpdateResultSuccess {
				code
				success
				message
				product {
					id
					name
					price
					stock
				}
			}
			... on ProductInvalidInputError {
				code
				success
				message
				nameErrorMessage
				priceErrorMessage
				stockErrorMessage
			}
			... on InternalServerError {
				code
				success
				message
			}
		}
	}
`

export const UPDATE_PRODUCT = gql`
	mutation updateProduct($input: ProductUpdateInput) {
		updateProduct(input: $input) {
			__typename
			... on ProductCreateOrUpdateResultSuccess {
				code
				success
				message
				product {
					id
					name
					price
					stock
				}
			}
			... on ProductInvalidInputError {
				code
				success
				message
				nameErrorMessage
				priceErrorMessage
				stockErrorMessage
			}
			... on InternalServerError {
				code
				success
				message
			}
		}
	}
`

export const DELETE_PRODUCT = gql`
	mutation deleteProduct($id: ID!) {
		deleteProduct(id: $id) {
			__typename
			... on ProductResultSuccess {
				code
				success
				message
				product {
					id
					name
					price
					stock
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
