import { gql } from 'apollo-server-express'

/**
 * @description holds order schema
 */

const OrderSchema = gql`
	enum OrderType {
		PENDING
		COMPLETED
		CANCELLED
	}

	type OrderProduct {
		id: ID
		quantity: Int
	}

	type Order {
		id: ID
		products: [OrderProduct]
		total: Int
		orderDate: String
		client: ID
		status: OrderType
	}

	type OrderResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		order: Order!
	}

	type OrdersResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		orders: [Order]
	}

	type TotalOrdersResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		total: Int
	}

	union OrderResult = OrderResultSuccess | NotFoundError | InternalServerError | UnauthorizedError

	union OrdersResult = OrdersResultSuccess | InternalServerError | UnauthorizedError

	union TotalOrdersResult = TotalOrdersResultSuccess | InternalServerError | UnauthorizedError

	type OrderInvalidInputError implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		productsErrorMessage: String
		totalErrorMessage: String
		orderDateErrorMessage: String
		clientErrorMessage: String
		statusErrorMessage: String
	}

	type OrderStatusInvalidInputError implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		statusErrorMessage: String
	}

	input OrderProductInput {
		id: ID
		quantity: Int
	}

	input OrderRegisterInput {
		products: [OrderProductInput]
		total: Int
		orderDate: String
		client: ID
		status: OrderType
	}

	input OrderStatusUpdateInput {
		id: ID!
		status: OrderType!
	}

	union OrderCreateOrUpdateResult =
		  OrderResultSuccess
		| OrderInvalidInputError
		| InternalServerError
		| UnauthorizedError

	union OrderUpdateStatusResult =
		  OrderResultSuccess
		| NotFoundError
		| OrderStatusInvalidInputError
		| InternalServerError
		| UnauthorizedError

	extend type Query {
		getOrders(limit: Int, since: Int): OrdersResult
		totalOrderCount: TotalOrdersResult
		getOrder(id: ID!): OrderResult
		getOrdersByClient(client: ID!): OrdersResult
	}

	extend type Mutation {
		createOrder(input: OrderRegisterInput): OrderCreateOrUpdateResult
		updateStatusOrder(input: OrderStatusUpdateInput): OrderUpdateStatusResult
		deleteOrder(id: ID!): OrderResult
	}
`

export default OrderSchema
