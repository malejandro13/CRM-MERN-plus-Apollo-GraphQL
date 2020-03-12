import { getOrders, totalOrderCount, getOrder, getOrdersByClient } from '../controllers/OrderController'

/**
 * @description holds order queries
 */

const OrderQuery = {
	getOrders: {
		resolve: async (parent, args, context, info) => {
			return await getOrders(context.dbConn, args.limit, args.since)
		}
	},
	totalOrderCount: {
		resolve: async (parent, args, context, info) => {
			return await totalOrderCount(context.dbConn)
		}
	},
	getOrder: {
		resolve: async (parent, args, context, info) => {
			return await getOrder(context.dbConn, args.id)
		}
	},
	getOrdersByClient: {
		resolve: async (parent, args, context, info) => {
			return await getOrdersByClient(context.dbConn, args.client)
		}
	}
}

export default OrderQuery
