import { getUsers, getUser, totalUserCount, getUserToken } from '../controllers/UserController'

/**
 * @description holds user queries
 */

const UserQuery = {
	getUsers: {
		resolve: async (parent, args, context, info) => {
			return await getUsers(context.dbConn, args.limit, args.since)
		}
	},
	totalUserCount: {
		resolve: async (parent, args, context, info) => {
			return await totalUserCount(context.dbConn)
		}
	},
	getUser: {
		resolve: async (parent, args, context, info) => {
			return await getUser(context.dbConn, args.id)
		}
	},
	getUserToken: {
		resolve: async (parent, args, context, info) => {
			if (context.userCurrent === null) {
				return {
					__typename: 'UnauthorizedError',
					code: 401,
					success: false,
					message: `No Unauthorized.`
				}
			}
			return await getUserToken(context.dbConn, context.userCurrent)
		}
	}
}

export default UserQuery
