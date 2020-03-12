import OrderQuery from '../queries/OrderQuery'
import OrderMutation from '../mutations/OrderMutation'
import { IResolvers } from 'apollo-server-express'

/**
 * @description holds order resolver
 */

const OrderResolver: IResolvers = {
	Query: OrderQuery,
	Mutation: OrderMutation
}

export default OrderResolver
