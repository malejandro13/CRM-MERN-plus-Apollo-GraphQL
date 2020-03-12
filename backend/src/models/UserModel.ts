import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

/**
 * @description holds user model
 */

/**
  * User interface
  */
export interface IUser extends mongoose.Document {
	id: string
	name: string
	email: string
	password: string
	role: string
	transform: () => IUser
}

/**
 * Valid roles
 */
let validRoles = {
	values: [ 'ADMINISTRATOR', 'SELLER' ],
	message: '{VALUE} is not a valid role'
}

/**
 * User schema
 */
const schema: mongoose.SchemaDefinition = {
	name: {
		type: String,
		required: [ true, 'User name required' ]
	},
	email: {
		type: String,
		validate: {
			validator: function(v) {
				return /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(v)
			},
			message: (props) => `${props.value} is not a valid email!`
		},
		lowercase: true,
		unique: true,
		required: [ true, 'User email required' ],
		uniqueCaseInsensitive: true
	},
	password: {
		type: String,
		required: [ true, 'User password required' ]
	},
	role: {
		type: String,
		default: 'SELLER',
		enum: validRoles
	}
}

// user collection name
const collectionName: string = 'users'

// user model name
const modelName: string = 'User'

const userSchema: mongoose.Schema = new mongoose.Schema(schema, { collection: collectionName })

/**
 * hash password with bcrypt
 */
userSchema.pre<IUser>('save', function(next) {
	let user = this
	if (!user.isModified('password')) return next()

	bcrypt.genSalt(10, (error, salt) => {
		if (error) return next(error)

		bcrypt.hash(user.password, salt, (error, hash) => {
			if (error) return next(error)
			user.password = hash
			return next()
		})
	})
})

/**
 * transforms user object, delete password and
 * changes _id to id
 */
userSchema.methods.transform = function() {
	var obj = this.toObject()
	delete obj.password
	var id = obj._id
	delete obj._id
	obj.id = id

	return obj
}

/**
 * unique validator for email field
 */
userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' })

/**
 * creates user model
 * @param conn database connection
 * @returns user model
 */
const UserModel = (conn: mongoose.Connection): mongoose.Model<IUser> => conn.model(modelName, userSchema)

export default UserModel
