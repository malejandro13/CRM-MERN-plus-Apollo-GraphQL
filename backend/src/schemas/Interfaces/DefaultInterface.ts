import { gql } from 'apollo-server-express'

/**
 * @description holds default interface
 */

const DefaultInterface = gql`
	interface DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
	}
`

export default DefaultInterface
