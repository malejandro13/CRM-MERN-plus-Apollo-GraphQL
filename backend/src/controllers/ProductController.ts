import ProductModel, { IProduct } from '../models/ProductModel'
import idx from 'idx'

/**
 * 
 * @description holds crud operations for the product entity 
 */

/**
 * gets all products
 * @param connection database connection
 * @param limit register limit
 * @param since skip register
 * @returns {IProduct[]} product list
 */
export const getProducts = async (connection: any, limit: number, since: number, gtStock: number) => {
	let list: IProduct[]

	try {
		list = await ProductModel(connection).find({}).skip(since).limit(limit).where('stock').gt(gtStock).exec()
		if (list != null && list.length > 0) {
			list = list.map((u) => {
				return u.transform()
			})
		}
	} catch (error) {
		console.error('> getProducts error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error retrieving all products.`
		}
	}

	return {
		__typename: 'ProductsResultSuccess',
		code: 200,
		success: true,
		message: `The products found successfully.`,
		products: list
	}
}

export const totalProductCount = async (connection: any) => {
	let totalProduct: number

	try {
		totalProduct = await ProductModel(connection).countDocuments({})
	} catch (error) {
		console.error('> totalProductCount error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error retrieving total product count.`
		}
	}

	return {
		__typename: 'TotalProductsResultSuccess',
		code: 200,
		success: true,
		message: `The total products successfully obtained.`,
		total: totalProduct
	}
}

/**
 * gets product by id
 * @param connection database connection
 * @param id product id
 * @returns {IProduct | null} product or null
 */
export const getProduct = async (connection: any, id: string) => {
	let product: IProduct | null

	try {
		product = await ProductModel(connection).findById(id)
		if (product != null) {
			product = product.transform()
		}
	} catch (error) {
		console.error('> getProduct error: ', error)
		return {
			__typename: 'NotFoundError',
			code: 404,
			success: false,
			message: `The product with the id ${id} does not exist.`
		}
	}

	return {
		__typename: 'ProductResultSuccess',
		code: 200,
		success: true,
		message: `The product with the id ${id} found successfully.`,
		product
	}
}

/**
 * creates product
 * @param connection database connection
 * @param args product
 * @returns {IProduct} created product
 */
export const createProduct = async (connection: any, args: IProduct) => {
	let createdProduct: IProduct

	try {
		createdProduct = (await ProductModel(connection).create(args)).transform()
	} catch (error) {
		console.error('> createProduct error: ', error)

		if (error.name === 'ValidationError') {
			return {
				__typename: 'ProductInvalidInputError',
				code: 400,
				success: false,
				message: `Validation Input Error.`,
				nameErrorMessage: idx(error, (_) => _.errors.name.message),
				priceErrorMessage: idx(error, (_) => _.errors.price.message),
				stockErrorMessage: idx(error, (_) => _.errors.stock.message)
			}
		}

		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error saving product with name: ${args.name}. Try again.`
		}
	}

	return {
		__typename: 'ProductCreateOrUpdateResultSuccess',
		code: 201,
		success: true,
		message: `Product register completed successfully`,
		product: createdProduct
	}
}

/**
 * deletes product
 * @param connection database connection
 * @param id product id
 * @returns {IProduct | null} deleted product or null
 */
export const deleteProduct = async (connection: any, id: string) => {
	let deletedProduct: IProduct | null

	try {
		deletedProduct = await ProductModel(connection).findByIdAndRemove(id)
		if (deletedProduct === null) {
			return {
				__typename: 'NotFoundError',
				code: 404,
				success: false,
				message: `The product with the id ${id} does not exist.`
			}
		}
		deletedProduct = deletedProduct.transform()
	} catch (error) {
		console.error('> deleteProduct error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 400,
			success: false,
			message: `Cast to ObjectId failed for value "${id}" at path "id" for model "Product".`
		}
	}
	return {
		__typename: 'ProductResultSuccess',
		code: 200,
		success: true,
		message: `Product delete completed successfully.`,
		product: deletedProduct
	}
}

/**
 * updates product
 * @param connection database connection
 * @param args product
 * @returns {IProduct | null} updated product or null
 */
export const updateProduct = async (context: any, args: IProduct) => {
	let updatedProduct: IProduct | null

	try {
		updatedProduct = await ProductModel(context).findByIdAndUpdate(
			args.id,
			{
				name: args.name,
				price: args.price,
				stock: args.stock
			},
			{ new: true, runValidators: true }
		)

		if (updatedProduct != null) {
			updatedProduct = updatedProduct.transform()
		}
	} catch (error) {
		console.error('> updateProduct error: ', error)
		if (error.name === 'ValidationError') {
			return {
				__typename: 'ProductInvalidInputError',
				code: 400,
				success: false,
				message: `Validation Input Error.`,
				nameErrorMessage: idx(error, (_) => _.errors.name.message),
				priceErrorMessage: idx(error, (_) => _.errors.price.message),
				stockErrorMessage: idx(error, (_) => _.errors.stock.message)
			}
		}

		return {
			__typename: 'InternalServerError',
			code: 500,
			success: true,
			message: `Error updating product with id: ${args.id} .`
		}
	}

	return {
		__typename: 'ProductCreateOrUpdateResultSuccess',
		code: 200,
		success: true,
		message: `Product update completed successfully`,
		product: updatedProduct
	}
}
