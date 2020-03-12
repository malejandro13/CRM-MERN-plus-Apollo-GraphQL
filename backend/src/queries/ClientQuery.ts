import { getClients, getClient, totalClientCount } from '../controllers/ClientController'

/**
 * @description holds client queries
 */

const ClientQuery = {
	getClients: {
		resolve: async (parent, args, context, info) => {
			return await getClients(context.dbConn, context.userCurrent, args.limit, args.since)
		}
	},
	totalClientCount: {
		resolve: async (parent, args, context, info) => {
			return await totalClientCount(context.dbConn, context.userCurrent)
		}
	},
	getClient: {
		resolve: async (parent, args, context, info) => {
			return await getClient(context.dbConn, context.userCurrent, args.id)
		}
	}
}

export default ClientQuery
