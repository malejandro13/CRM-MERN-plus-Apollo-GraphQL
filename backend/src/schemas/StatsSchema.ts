import { gql } from 'apollo-server-express'

/**
 * @description holds stats schema
 */

const StatsSchema = gql`
	type TopClient {
		total: Float
		client: [Client]
	}

	type TopSeller {
		total: Float
		user: [User]
	}

	type StatsClientResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		topClients: [TopClient]
	}

	type StatsSellerResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		topSellers: [TopSeller]
	}

	union StatsClientResult = StatsClientResultSuccess | InternalServerError | UnauthorizedError

	union StatsSellerResult = StatsSellerResultSuccess | InternalServerError | UnauthorizedError

	extend type Query {
		getTopTenClients: StatsClientResult
		getTopTenSellers: StatsSellerResult
	}
`

export default StatsSchema
