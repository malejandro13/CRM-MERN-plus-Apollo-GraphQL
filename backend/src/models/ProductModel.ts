import mongoose from 'mongoose'

/**
 * @description holds product model
 */

/**
  * Product interface
  */
export interface IProduct extends mongoose.Document {
	id: string
	name: string
	price: number
	stock: number
	transform: () => IProduct
}

/**
 * Product schema
 */
const schema: mongoose.SchemaDefinition = {
	name: {
		type: String,
		required: [ true, 'Product name required' ]
	},
	price: {
		type: Number,
		required: [ true, 'Product price required' ]
	},
	stock: {
		type: Number,
		min: [ 0, 'Stock cannot be less than zero' ],
		required: [ true, 'Product stock required' ]
	}
}

// product collection name
const collectionName: string = 'products'

// product model name
const modelName: string = 'Product'

const productSchema: mongoose.Schema = new mongoose.Schema(schema, { collection: collectionName })

/**
 * transforms product object
 * changes _id to id
 */
productSchema.methods.transform = function() {
	var obj = this.toObject()

	var id = obj._id
	delete obj._id
	obj.id = id

	return obj
}

/**
 * create product model
 * @param conn database connection
 * @returns product model
 */
const ProductModel = (conn: mongoose.Connection): mongoose.Model<IProduct> => conn.model(modelName, productSchema)

export default ProductModel
