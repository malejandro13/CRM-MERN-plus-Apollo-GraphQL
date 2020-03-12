import UserQuery from '../queries/UserQuery'
import UserMutation from '../mutations/UserMutation'
import { IResolvers } from 'apollo-server-express'

/**
 * @description holds user resolver
 */

const UserResolver: IResolvers = {
	Query: UserQuery,
	Mutation: UserMutation
}

export default UserResolver
