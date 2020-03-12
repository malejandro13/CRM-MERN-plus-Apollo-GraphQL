import OrderModel, { IOrder } from '../models/OrderModel'
import ProductModel, { IProduct } from '../models/ProductModel'
import { clientExists } from './ClientController'
import { IUser } from '../models/UserModel'
import idx from 'idx'

/**
 * 
 * @description holds crud operations for the order entity 
 */

/**
 * gets all orders
 * @param connection database connection
 * @param limit register limit
 * @param since skip register
 * @returns {IOrder[]} order list
 */
export const getOrders = async (connection: any, limit: number, since: number) => {
	let list: IOrder[]

	try {
		list = await OrderModel(connection).find({}).skip(since).limit(limit).exec()
		if (list != null && list.length > 0) {
			list = list.map((u) => {
				return u.transform()
			})
		}
	} catch (error) {
		console.error('> getOrders error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error retrieving all orders.`
		}
	}

	return {
		__typename: 'OrdersResultSuccess',
		code: 200,
		success: true,
		message: `The orders found successfully.`,
		orders: list
	}
}

/**
 * gets all orders by client
 * @param connection database connection
 * @param client client ID
 * @returns {IOrder[]} order list
 */
export const getOrdersByClient = async (connection: any, client: string) => {
	let orders: IOrder[]

	try {
		orders = await OrderModel(connection).find({ client }).exec()
		if (orders != null && orders.length > 0) {
			orders = orders.map((u) => {
				return u.transform()
			})
		}
	} catch (error) {
		console.error('> getOrders error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error retrieving all orders by client.`
		}
	}

	return {
		__typename: 'OrdersResultSuccess',
		code: 200,
		success: true,
		message: `The orders found successfully.`,
		orders: orders
	}
}

export const totalOrderCount = async (connection: any) => {
	let totalOrder: number

	try {
		totalOrder = await OrderModel(connection).countDocuments({})
	} catch (error) {
		console.error('> totalOrderCount error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error retrieving total order count.`
		}
	}

	return {
		__typename: 'TotalOrdersResultSuccess',
		code: 200,
		success: true,
		message: `The total orders successfully obtained.`,
		total: totalOrder
	}
}

/**
 * gets order by id
 * @param connection database connection
 * @param id order id
 * @returns {IOrder | null} order or null
 */
export const getOrder = async (connection: any, id: string) => {
	let order: IOrder | null

	try {
		order = await OrderModel(connection).findById(id)
		if (order != null) {
			order = order.transform()
		}
	} catch (error) {
		console.error('> getOrder error: ', error)
		return {
			__typename: 'NotFoundError',
			code: 404,
			success: false,
			message: `The order with the id ${id} does not exist.`
		}
	}

	return {
		__typename: 'OrderResultSuccess',
		code: 200,
		success: true,
		message: `The order with the id ${id} found successfully.`,
		order
	}
}

/**
 * creates order
 * @param connection database connection
 * @param args order
 * @returns {IOrder} created order
 */
export const createOrder = async (connection: any, userCurrent: IUser, args: IOrder) => {
	let createdOrder: IOrder
	let updatedProduct: IProduct | null
	let client: boolean

	try {
		args.user = userCurrent.id
		client = await clientExists(connection, args.client)
		if (!client) {
			return {
				__typename: 'OrderInvalidInputError',
				code: 400,
				success: false,
				message: `The client with id ${args.client} does not exist`
			}
		}

		for (let product of args.products) {
			updatedProduct = await ProductModel(connection).findOneAndUpdate(
				{ _id: product.id, stock: { $gt: product.quantity - 1 } },
				{
					$inc: { stock: -product.quantity }
				},
				{ new: true }
			)

			if (updatedProduct === null) {
				return {
					__typename: 'OrderInvalidInputError',
					code: 400,
					success: false,
					message: `There is no stock for the product with the id: ${product.id}`
				}
			}
		}
		createdOrder = (await OrderModel(connection).create(args)).transform()
	} catch (error) {
		console.error('> createOrder error: ', error)

		if (error.name === 'ValidationError') {
			return {
				__typename: 'OrderInvalidInputError',
				code: 400,
				success: false,
				message: `Validation Input Error.`
			}
		}
		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error saving order with name: . Try again.`
		}
	}

	return {
		__typename: 'OrderResultSuccess',
		code: 201,
		success: true,
		message: `Order register completed successfully`,
		order: createdOrder
	}
}

/**
 * deletes order
 * @param connection database connection
 * @param id order id
 * @returns {IOrder | null} deleted order or null
 */
export const deleteOrder = async (connection: any, id: string) => {
	let deletedOrder: IOrder | null

	try {
		deletedOrder = await OrderModel(connection).findByIdAndRemove(id)
		if (deletedOrder === null) {
			return {
				__typename: 'NotFoundError',
				code: 404,
				success: false,
				message: `The order with the id ${id} does not exist.`
			}
		}
		deletedOrder = deletedOrder.transform()
	} catch (error) {
		console.error('> deleteOrder error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 400,
			success: false,
			message: `Cast to ObjectId failed for value "${id}" at path "id" for model "Order".`
		}
	}
	return {
		__typename: 'OrderResultSuccess',
		code: 200,
		success: true,
		message: `Order delete completed successfully.`,
		order: deletedOrder
	}
}

/**
 * updates status order
 * @param connection database connection
 * @param args order
 * @returns {IOrder | null} updated order or null
 */
export const updateStatusOrder = async (connection: any, args: IOrder) => {
	let updatedOrder: IOrder | null
	let updatedProduct: IProduct | null
	let order: IOrder | null
	let updateQuantity: string = '+'
	let update: boolean = false

	try {
		order = await OrderModel(connection).findById(args.id).exec()

		if (order === null) {
			return {
				__typename: 'NotFoundError',
				code: 404,
				success: false,
				message: `Order with id: ${args.id} not found.`
			}
		}

		if (args.status === 'COMPLETED' && order.status === 'CANCELLED') {
			updateQuantity = '-'
			update = true
		}

		if (args.status === 'PENDING' && order.status === 'CANCELLED') {
			updateQuantity = '-'
			update = true
		}

		if (args.status === 'CANCELLED') {
			updateQuantity = '+'
			update = true
		}

		if (update) {
			for (let product of order.products) {
				updatedProduct = await ProductModel(connection).findOneAndUpdate(
					{ _id: product.id, stock: { $gt: product.quantity - 1 } },
					{
						$inc: { stock: `${updateQuantity}${product.quantity}` }
					},
					{ new: true }
				)
			}
		}
		updatedOrder = await OrderModel(connection).findByIdAndUpdate(
			args.id,
			{
				status: args.status
			},
			{ new: true, runValidators: true }
		)

		if (updatedOrder != null) {
			updatedOrder = updatedOrder.transform()
		}
	} catch (error) {
		console.error('> updateOrder error: ', error)
		if (error.name === 'ValidationError') {
			return {
				__typename: 'OrderStatusInvalidInputError',
				code: 400,
				success: false,
				message: `Validation Input Error.`,
				statusErrorMessage: idx(error, (_) => _.errors.status.message)
			}
		}

		return {
			__typename: 'InternalServerError',
			code: 500,
			success: true,
			message: `Error updating order with id: ${args.id} .`
		}
	}

	return {
		__typename: 'OrderResultSuccess',
		code: 200,
		success: true,
		message: `Order update completed successfully`,
		order: updatedOrder
	}
}
