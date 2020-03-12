import mongoose from 'mongoose'

/**
 * @description holds client model
 */

/**
  * Client interface
  */
export interface IClient extends mongoose.Document {
	id: string
	name: string
	surname: string
	company: string
	emails: Array<object>
	age: number
	type: string
	user: string
	transform: () => IClient
}
/**
 * Valid types
 */
let validTypes = {
	values: [ 'BASIC', 'PREMIUM' ],
	message: '{VALUE} is not a valid type'
}

/**
 * Client schema
 */
const schema: mongoose.SchemaDefinition = {
	name: {
		type: String,
		required: [ true, 'Client name required' ]
	},
	surname: {
		type: String,
		required: [ true, 'Client surname required' ]
	},
	company: {
		type: String,
		required: [ true, 'Client company required' ]
	},
	emails: [
		{
			email: {
				type: String,
				validate: {
					validator: function(v) {
						return /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v)
					},
					message: (props) => `${props.value} is not a valid email!`
				}
			}
		}
	],
	age: {
		type: Number,
		min: 1,
		max: 125,
		required: [ true, 'Client age required' ]
	},
	type: {
		type: String,
		default: 'BASIC',
		enum: validTypes
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: [ true, 'Client user required' ]
	}
}

// client collection name
const collectionName: string = 'clients'

// client model name
const modelName: string = 'Client'

const clientSchema: mongoose.Schema = new mongoose.Schema(schema, { collection: collectionName })

/**
 * transforms client object and 
 * changes _id to id
 */
clientSchema.methods.transform = function() {
	var obj = this.toObject()

	var id = obj._id
	delete obj._id
	obj.id = id

	return obj
}

/**
 * creates client model
 * @param conn database connection
 * @returns client model
 */
const ClientModel = (conn: mongoose.Connection): mongoose.Model<IClient> => conn.model(modelName, clientSchema)

export default ClientModel
