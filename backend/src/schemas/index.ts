import DefaultInterface from './Interfaces/DefaultInterface'
import DefaultSchema from './DefaultSchema'
import ClientSchema from './ClientSchema'
import ProductSchema from './ProductSchema'
import DefaultResponse from './Responses/DefaultResponse'
import OrderSchema from './OrderSchema'
import UserSchema from './UserSchema'
import StatsSchema from './StatsSchema'

/**
 * @description holds all schemas
 */

const schema = [
	DefaultSchema,
	DefaultInterface,
	DefaultResponse,
	ClientSchema,
	ProductSchema,
	OrderSchema,
	UserSchema,
	StatsSchema
]

export default schema
