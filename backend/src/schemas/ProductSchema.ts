import { gql } from 'apollo-server-express'

/**
 * @description holds product schema
 */

const ProductSchema = gql`
	type Product {
		id: ID
		name: String
		price: Int
		stock: Int
	}

	type ProductResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		product: Product!
	}

	type ProductsResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		products: [Product]
	}

	type TotalProductsResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		total: Int
	}

	union ProductResult = ProductResultSuccess | NotFoundError | InternalServerError | UnauthorizedError

	union ProductsResult = ProductsResultSuccess | InternalServerError | UnauthorizedError

	union TotalProductsResult = TotalProductsResultSuccess | InternalServerError | UnauthorizedError

	type ProductCreateOrUpdateResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		product: Product!
	}

	type ProductInvalidInputError implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		nameErrorMessage: String
		priceErrorMessage: String
		stockErrorMessage: String
	}

	input ProductRegisterInput {
		name: String!
		price: Int!
		stock: Int!
	}

	input ProductUpdateInput {
		id: ID!
		name: String!
		price: Int!
		stock: Int!
	}

	union ProductCreateOrUpdateResult =
		  ProductCreateOrUpdateResultSuccess
		| ProductInvalidInputError
		| InternalServerError
		| UnauthorizedError

	extend type Query {
		getProducts(limit: Int, since: Int, gtStock: Int!): ProductsResult
		totalProductCount: TotalProductsResult
		getProduct(id: ID!): ProductResult
	}

	extend type Mutation {
		createProduct(input: ProductRegisterInput): ProductCreateOrUpdateResult
		updateProduct(input: ProductUpdateInput): ProductCreateOrUpdateResult
		deleteProduct(id: ID!): ProductResult
	}
`

export default ProductSchema
