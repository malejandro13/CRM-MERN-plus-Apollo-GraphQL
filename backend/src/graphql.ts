import { ApolloServer } from 'apollo-server-express'
import depthLimit from 'graphql-depth-limit'
import resolvers from './resolvers'
import schemas from './schemas'
import { makeExecutableSchema } from 'graphql-tools'
import getConnection from './database/Provider'
import { validToken } from './services/token'

/**
 * @description holds and creates apollo server
 */

const schema = makeExecutableSchema({
	resolvers,
	resolverValidationOptions: {
		requireResolversForResolveType: false
	},
	typeDefs: schemas
})

const apolloServer = new ApolloServer({
	schema,
	context: async ({ req }) => {
		const dbConn = await getConnection()
		const token = req.headers.authorization || ''

		const userCurrent = await validToken(dbConn, token.replace('Bearer ', ''), {
			issuer: 'AnyPlace',
			subject: 'contacto@anyplace.cl',
			audience: 'https://anyplace.cl'
		})

		return { dbConn, userCurrent }
	},
	introspection: true,
	validationRules: [ depthLimit(7) ]
})

export default apolloServer
