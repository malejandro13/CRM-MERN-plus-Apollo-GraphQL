import OrderModel, { IOrder } from '../models/OrderModel'

/**
 * 
 * @description holds read operations for the stats
 */

/**
 * gets top ten client who buy the most
 * @param connection database connection
 * @returns {IOrder[]} order list
 */
export const getTopTenClients = async (connection: any) => {
	let list: any[]

	try {
		list = await OrderModel(connection).aggregate([
			{
				$match: { status: 'COMPLETED' }
			},
			{
				$group: {
					_id: '$client',
					total: { $sum: '$total' }
				}
			},
			{
				$lookup: {
					from: 'clients',
					localField: '_id',
					foreignField: '_id',
					as: 'client'
				}
			},
			{
				$sort: { total: -1 }
			},
			{
				$limit: 10
			}
		])
	} catch (error) {
		console.error('> getTopTenClients error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error retrieving top ten clients.`
		}
	}

	return {
		__typename: 'StatsClientResultSuccess',
		code: 200,
		success: true,
		message: `The top ten clients found successfully.`,
		topClients: list
	}
}

/**
 * gets top ten seller who sell the most
 * @param connection database connection
 * @returns {IOrder[]} order list
 */
export const getTopTenSellers = async (connection: any) => {
	let list: any[]

	try {
		list = await OrderModel(connection).aggregate([
			{
				$match: { status: 'COMPLETED' }
			},
			{
				$group: {
					_id: '$user',
					total: { $sum: '$total' }
				}
			},
			{
				$lookup: {
					from: 'users',
					localField: '_id',
					foreignField: '_id',
					as: 'user'
				}
			},
			{
				$sort: { total: -1 }
			},
			{
				$limit: 10
			}
		])
	} catch (error) {
		console.error('> getTopTenSellers error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error retrieving top ten sellers.`
		}
	}

	return {
		__typename: 'StatsSellerResultSuccess',
		code: 200,
		success: true,
		message: `The top ten sellers found successfully.`,
		topSellers: list
	}
}
