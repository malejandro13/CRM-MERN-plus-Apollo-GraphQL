import mongoose from 'mongoose'

/**
 * @description holds product model
 */

/**
  * Order interface
  */
export interface IOrder extends mongoose.Document {
	id: string
	products: Array<any>
	total: number
	orderDate: Date
	client: string
	status: string
	user: string
	transform: () => IOrder
}

/**
 * Valid status
 */
let validStatus = {
	values: [ 'PENDING', 'COMPLETED', 'CANCELLED' ],
	message: '{VALUE} is not a valid type'
}

/**
 * Order schema
 */
const schema: mongoose.SchemaDefinition = {
	products: {
		type: Array,
		required: [ true, 'Order products required' ]
	},
	total: {
		type: Number,
		required: [ true, 'Order total required' ]
	},
	orderDate: {
		type: Date,
		default: Date.now
	},
	client: {
		type: mongoose.Types.ObjectId,
		ref: 'Client',
		required: [ true, 'Order client required' ]
	},
	status: {
		type: String,
		default: 'PENDING',
		enum: validStatus
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: [ true, 'Order user required' ]
	}
}

// order collection name
const collectionName: string = 'orders'

// order model name
const modelName: string = 'Order'

const orderSchema: mongoose.Schema = new mongoose.Schema(schema, { collection: collectionName })

/**
 * transforms product object and
 * changes _id to id
 */
orderSchema.methods.transform = function() {
	var obj = this.toObject()

	var id = obj._id
	delete obj._id
	obj.id = id

	return obj
}

/**
 * create order model
 * @param conn database connection
 * @returns order model
 */
const OrderModel = (conn: mongoose.Connection): mongoose.Model<IOrder> => conn.model(modelName, orderSchema)

export default OrderModel
