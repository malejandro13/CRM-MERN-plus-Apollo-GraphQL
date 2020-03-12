import { createOrder, deleteOrder, updateStatusOrder } from '../controllers/OrderController'

/**
 * @description holds order mutations
 */

const OrderMutation = {
	createOrder: {
		resolve: async (parent, args, context, info) => {
			return await createOrder(context.dbConn, context.userCurrent, args.input)
		}
	},
	updateStatusOrder: {
		resolve: async (parent, args, context, info) => {
			return await updateStatusOrder(context.dbConn, args.input)
		}
	},
	deleteOrder: {
		resolve: async (parent, args, context, info) => {
			return await deleteOrder(context.dbConn, args.id)
		}
	}
}

export default OrderMutation
