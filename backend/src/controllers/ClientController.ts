import ClientModel, { IClient } from '../models/ClientModel'
import { IUser } from '../models/UserModel'
import idx from 'idx'

/**
 * 
 * @description holds crud operations for the client entity 
 */

/**
 * gets all clients
 * @param connection database connection
 * @param limit register limit
 * @param since skip register
 * @returns {IClient[]} client list
 */
export const getClients = async (connection: any, userCurrent: IUser, limit: number, since: number) => {
	let list: IClient[]
	let findByRole: object = {}
	try {
		if (userCurrent.role === 'SELLER') findByRole = { user: userCurrent.id }

		list = await ClientModel(connection).find(findByRole).skip(since).limit(limit).exec()
		if (list != null && list.length > 0) {
			list = list.map((u) => {
				return u.transform()
			})
		}
	} catch (error) {
		console.error('> getClients error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error retrieving all clients.`
		}
	}

	return {
		__typename: 'ClientsResultSuccess',
		code: 200,
		success: true,
		message: `The clients found successfully.`,
		clients: list
	}
}

export const totalClientCount = async (connection: any, userCurrent: IUser) => {
	let totalClient: number
	let findByRole: object = {}
	try {
		if (userCurrent.role === 'SELLER') findByRole = { user: userCurrent.id }
		totalClient = await ClientModel(connection).countDocuments(findByRole)
	} catch (error) {
		console.error('> totalClientCount error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error retrieving total client count.`
		}
	}

	return {
		__typename: 'TotalClientsResultSuccess',
		code: 200,
		success: true,
		message: `The total clients successfully obtained.`,
		total: totalClient
	}
}

/**
 * gets client by id
 * @param connection database connection
 * @param id client id
 * @returns {IClient | null} client or null
 */
export const getClient = async (connection: any, userCurrent: IUser, id: string) => {
	let client: IClient | null

	try {
		client = await ClientModel(connection).findById(id)
		if (client != null) {
			client = client.transform()
		}
	} catch (error) {
		console.error('> getClient error: ', error)
		return {
			__typename: 'NotFoundError',
			code: 404,
			success: false,
			message: `The client with the id ${id} does not exist.`
		}
	}

	return {
		__typename: 'ClientResultSuccess',
		code: 200,
		success: true,
		message: `The client with the id ${id} found successfully.`,
		client
	}
}

/**
 * creates client
 * @param connection database connection
 * @param args client
 * @returns {IClient} created client
 */
export const createClient = async (connection: any, userCurrent: IUser, args: IClient) => {
	let createdClient: IClient

	try {
		args.user = userCurrent.id
		createdClient = (await ClientModel(connection).create(args)).transform()
	} catch (error) {
		console.error('=> createClient error: ', error)

		if (error.name === 'ValidationError') {
			return {
				__typename: 'ClientInvalidInputError',
				code: 400,
				success: false,
				message: `Validation Input Error.`,
				nameErrorMessage: idx(error, (_) => _.errors.name.message),
				surnameErrorMessage: idx(error, (_) => _.errors.surname.message),
				companyErrorMessage: idx(error, (_) => _.errors.type.message),
				ageErrorMessage: idx(error, (_) => _.errors.type.message),
				typeErrorMessage: idx(error, (_) => _.errors.type.message)
			}
		}

		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error saving client with name: ${args.name}. Try again.`
		}
	}

	return {
		__typename: 'ClientCreateOrUpdateResultSuccess',
		code: 201,
		success: true,
		message: `Client register completed successfully`,
		client: createdClient
	}
}

/**
 * deletes client
 * @param connection database connection
 * @param id client id
 * @returns {IClient | null} deleted client or null
 */
export const deleteClient = async (connection: any, id: string) => {
	let deletedClient: IClient | null

	try {
		deletedClient = await ClientModel(connection).findByIdAndRemove(id)
		if (deletedClient === null) {
			return {
				__typename: 'NotFoundError',
				code: 404,
				success: false,
				message: `The client with the id ${id} does not exist.`
			}
		}
		deletedClient = deletedClient.transform()
	} catch (error) {
		console.error('> deleteClient error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 400,
			success: false,
			message: `Cast to ObjectId failed for value "${id}" at path "id" for model "Client".`
		}
	}
	return {
		__typename: 'ClientResultSuccess',
		code: 200,
		success: true,
		message: `Client delete completed successfully.`,
		client: deletedClient
	}
}

/**
 * updates client
 * @param connection database connection
 * @param args client
 * @returns {IClient | null} updated client or null
 */
export const updateClient = async (context: any, args: IClient) => {
	let updatedClient: IClient | null

	try {
		updatedClient = await ClientModel(context).findByIdAndUpdate(
			args.id,
			{
				name: args.name,
				surname: args.surname,
				company: args.company,
				emails: args.emails,
				age: args.age,
				type: args.type
			},
			{ new: true, runValidators: true }
		)

		if (updatedClient != null) {
			updatedClient = updatedClient.transform()
		}
	} catch (error) {
		console.error('> updateClient error: ', error)
		if (error.name === 'ValidationError') {
			return {
				__typename: 'ClientInvalidInputError',
				code: 400,
				success: false,
				message: `Validation Input Error.`,
				nameErrorMessage: idx(error, (_) => _.errors.name.message),
				surnamerrorMessage: idx(error, (_) => _.errors.surname.message),
				companyErrorMessage: idx(error, (_) => _.errors.company.message),
				ageErrorMessage: idx(error, (_) => _.errors.age.message),
				typeErrorMessage: idx(error, (_) => _.errors.type.message)
			}
		}

		return {
			__typename: 'InternalServerError',
			code: 500,
			success: true,
			message: `Error updating client with id: ${args.id} .`
		}
	}

	return {
		__typename: 'ClientCreateOrUpdateResultSuccess',
		code: 200,
		success: true,
		message: `Client update completed successfully`,
		client: updatedClient
	}
}

/**
 * valid if the client exists by id
 * @param connection database connection
 * @param id client id
 * @returns {true | false} true or false 
 */
export const clientExists = async (connection: any, id: string) => {
	let client: number

	try {
		client = await ClientModel(connection).countDocuments({ _id: id }).exec()
		if (client > 0) {
			return true
		}
	} catch (error) {
		return false
	}
	return false
}
