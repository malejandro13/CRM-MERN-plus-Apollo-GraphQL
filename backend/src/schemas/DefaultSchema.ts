import { gql } from 'apollo-server-express'

/**
 * @description holds default schema
 */

const DefaultSchema = gql`
	type Subscription {
		_empty: String
	}

	type Query {
		_empty: String
	}

	type Mutation {
		_empty: String
	}
`

export default DefaultSchema
