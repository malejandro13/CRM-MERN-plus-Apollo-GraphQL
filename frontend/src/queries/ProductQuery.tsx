import gql from 'graphql-tag'
export const PRODUCTS_QUERY = gql`
	query getProducts($limit: Int, $since: Int, $gtStock: Int!) {
		getProducts(limit: $limit, since: $since, gtStock: $gtStock) {
			__typename
			... on ProductsResultSuccess {
				code
				success
				message
				products {
					id
					name
					price
					stock
				}
			}
			... on InternalServerError {
				code
				success
				message
			}
		}
		totalProductCount {
			__typename
			... on TotalProductsResultSuccess {
				total
			}
			... on InternalServerError {
				message
			}
		}
	}
`

export const PRODUCT_QUERY = gql`
	query getProduct($id: ID!) {
		getProduct(id: $id) {
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
