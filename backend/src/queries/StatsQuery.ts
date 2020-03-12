import { getTopTenClients, getTopTenSellers } from '../controllers/StatsController'

/**
 * @description holds stats queries
 */

const StatsQuery = {
	getTopTenClients: {
		resolve: async (parent, args, context, info) => {
			return await getTopTenClients(context.dbConn)
		}
	},
	getTopTenSellers: {
		resolve: async (parent, args, context, info) => {
			return await getTopTenSellers(context.dbConn)
		}
	}
}

export default StatsQuery
