import { createProduct, deleteProduct, updateProduct } from '../controllers/ProductController'

/**
 * @description holds product mutations
 */

const ProductMutation = {
	createProduct: {
		resolve: async (parent, args, context, info) => {
			return await createProduct(context.dbConn, args.input)
		}
	},
	updateProduct: {
		resolve: async (parent, args, context, info) => {
			return await updateProduct(context.dbConn, args.input)
		}
	},
	deleteProduct: {
		resolve: async (parent, args, context, info) => {
			return await deleteProduct(context.dbConn, args.id)
		}
	}
}

export default ProductMutation
