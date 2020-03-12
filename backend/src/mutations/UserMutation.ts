import { createUser, deleteUser, loginUser } from '../controllers/UserController'

/**
 * @description holds user mutations
 */

const UserMutation = {
	createUser: {
		resolve: async (parent, args, context, info) => {
			return await createUser(context.dbConn, args.input)
		}
	},
	deleteUser: {
		resolve: async (parent, args, context, info) => {
			return await deleteUser(context.dbConn, args.id)
		}
	},
	loginUser: {
		resolve: async (parent, args, context, info) => {
			return await loginUser(context.dbConn, args.input)
		}
	}
}

export default UserMutation
