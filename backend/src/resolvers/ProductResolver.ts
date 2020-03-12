import ProductQuery from '../queries/ProductQuery'
import ProductMutation from '../mutations/ProductMutation'
import { IResolvers } from 'apollo-server-express'

/**
 * @description holds product resolver
 */

const ProductResolver: IResolvers = {
	Query: ProductQuery,
	Mutation: ProductMutation
}

export default ProductResolver
