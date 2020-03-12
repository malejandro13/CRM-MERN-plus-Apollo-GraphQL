import { createClient, deleteClient, updateClient } from '../controllers/ClientController'

/**
 * @description holds client mutations
 */

const ClientMutation = {
	createClient: {
		resolve: async (parent, args, context, info) => {
			return await createClient(context.dbConn, context.userCurrent, args.input)
		}
	},
	updateClient: {
		resolve: async (parent, args, context, info) => {
			return await updateClient(context.dbConn, args.input)
		}
	},
	deleteClient: {
		resolve: async (parent, args, context, info) => {
			return await deleteClient(context.dbConn, args.id)
		}
	}
}

export default ClientMutation
