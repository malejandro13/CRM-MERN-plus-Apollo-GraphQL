import { gql } from 'apollo-server-express'

/**
 * @description holds internal server error response
 */

const DefaultResponse = gql`
	type InternalServerError implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
	}

	type NotFoundError implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
	}

	type UnauthorizedError implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
	}
`

export default DefaultResponse
