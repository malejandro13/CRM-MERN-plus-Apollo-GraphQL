import mongoose from 'mongoose'

/**
 * @description holds database connection provider
 */

// connection uri
const uri: string = process.env.MONGO_DB_PATH as string

// mongoose connection
let conn: mongoose.Connection | null = null

/**
 * creates database connection
 * @returns mongodb connection
 */
const getConnection = async (): Promise<mongoose.Connection> => {
	if (conn == null) {
		try {
			conn = await mongoose.createConnection(uri, {
				bufferCommands: false,
				bufferMaxEntries: 0,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false
			})
			console.log('MongoDb connection successfully')
		} catch (error) {
			console.log(error)
			return error
		}
	}
	return conn
}

export default getConnection
