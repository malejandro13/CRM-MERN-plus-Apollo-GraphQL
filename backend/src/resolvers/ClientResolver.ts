import ClientQuery from '../queries/ClientQuery'
import ClientMutation from '../mutations/ClientMutation'
import { IResolvers } from 'apollo-server-express'

/**
 * @description holds client resolver
 */

const ClientResolver: IResolvers = {
	Query: ClientQuery,
	Mutation: ClientMutation
}

export default ClientResolver
