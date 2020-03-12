import { getProducts, totalProductCount, getProduct } from '../controllers/ProductController'

/**
 * @description holds product queries
 */

const ProductQuery = {
	getProducts: {
		resolve: async (parent, args, context, info) => {
			return await getProducts(context.dbConn, args.limit, args.since, args.gtStock)
		}
	},
	totalProductCount: {
		resolve: async (parent, args, context, info) => {
			return await totalProductCount(context.dbConn)
		}
	},
	getProduct: {
		resolve: async (parent, args, context, info) => {
			return await getProduct(context.dbConn, args.id)
		}
	}
}

export default ProductQuery
