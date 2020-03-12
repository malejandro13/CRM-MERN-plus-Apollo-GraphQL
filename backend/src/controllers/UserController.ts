import UserModel, { IUser } from '../models/UserModel'
import { createToken } from '../services/token'
import idx from 'idx'
import bcrypt from 'bcrypt'

const transactions = {}

/**
 * 
 * @description holds crud operations for the user entity 
 */

/**
 * gets all users
 * @param connection database connection
 * @param limit register limit
 * @param since skip register
 * @returns {IUser[]} user list
 */
export const getUsers = async (connection: any, limit: number, since: number) => {
	let list: IUser[]

	try {
		list = await UserModel(connection).find({}).skip(since).limit(limit).exec()
		if (list != null && list.length > 0) {
			list = list.map((u) => {
				return u.transform()
			})
		}
	} catch (error) {
		console.error('> getUsers error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error retrieving all users.`
		}
	}

	return {
		__typename: 'UsersResultSuccess',
		code: 200,
		success: true,
		message: `The users found successfully.`,
		users: list
	}
}

export const totalUserCount = async (connection: any) => {
	let totalUser: number

	try {
		totalUser = await UserModel(connection).countDocuments({})
	} catch (error) {
		console.error('> totalUserCount error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error retrieving total user count.`
		}
	}

	return {
		__typename: 'TotalUsersResultSuccess',
		code: 200,
		success: true,
		message: `The total users successfully obtained.`,
		total: totalUser
	}
}

/**
 * gets user by id
 * @param connection database connection
 * @param id user id
 * @returns {IUser | null} user or null
 */
export const getUser = async (connection: any, id: string) => {
	let user: IUser | null

	try {
		user = await UserModel(connection).findById(id)
		if (user != null) {
			user = user.transform()
		}
	} catch (error) {
		console.error('> getUser error: ', error)
		return {
			__typename: 'NotFoundError',
			code: 404,
			success: false,
			message: `The user with the id ${id} does not exist.`
		}
	}

	return {
		__typename: 'UserResultSuccess',
		code: 200,
		success: true,
		message: `The user with the id ${id} found successfully.`,
		user
	}
}

/**
 * creates user
 * @param connection database connection
 * @param args user
 * @returns {IUser} created user
 */
export const createUser = async (connection: any, args: IUser) => {
	let createdUser: IUser

	try {
		createdUser = (await UserModel(connection).create(args)).transform()
	} catch (error) {
		console.error('> createUser error: ', error)

		if (error.name === 'ValidationError') {
			return {
				__typename: 'UserInvalidInputError',
				code: 400,
				success: false,
				message: `Validation Input Error.`,
				nameErrorMessage: idx(error, (_) => _.errors.name.message),
				emailErrorMessage: idx(error, (_) => _.errors.email.message),
				passwordErrorMessage: idx(error, (_) => _.errors.password.message),
				roleErrorMessage: idx(error, (_) => _.errors.role.message)
			}
		}

		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error saving user with name: ${args.email}. Try again.`
		}
	}

	return {
		__typename: 'UserCreateOrUpdateResultSuccess',
		code: 201,
		success: true,
		message: `User register completed successfully`,
		user: createdUser
	}
}

/**
 * deletes user
 * @param connection database connection
 * @param id user id
 * @returns {IUser | null} deleted user or null
 */
export const deleteUser = async (connection: any, id: string) => {
	let deletedUser: IUser | null

	try {
		deletedUser = await UserModel(connection).findByIdAndRemove(id)
		if (deletedUser === null) {
			return {
				__typename: 'NotFoundError',
				code: 404,
				success: false,
				message: `The user with the id ${id} does not exist.`
			}
		}
		deletedUser = deletedUser.transform()
	} catch (error) {
		console.error('> deleteUser error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 400,
			success: false,
			message: `Cast to ObjectId failed for value "${id}" at path "id" for model "User".`
		}
	}
	return {
		__typename: 'UserResultSuccess',
		code: 200,
		success: true,
		message: `User delete completed successfully.`,
		user: deletedUser
	}
}

/**
 * valid if the user exists by id
 * @param connection database connection
 * @param id user id
 * @returns {true | false} true or false 
 */
export const userExists = async (connection: any, id: string) => {
	let user: number

	try {
		user = await UserModel(connection).countDocuments({ _id: id }).exec()
		if (user > 0) {
			return true
		}
	} catch (error) {
		return false
	}
	return false
}

/**
 * auth user login
 * @param connection database connection
 * @param id user id
 * @returns {true | false} true or false 
 */
export const loginUser = async (connection: any, args: IUser) => {
	let user: IUser | null
	let token: string

	const credentialNotValid: object = {
		__typename: 'UserInvalidInputError',
		code: 400,
		success: false,
		message: `Validation Input Error.`,
		loginErrorMessage: 'The credentials are not valid'
	}

	try {
		user = await UserModel(connection).findOne({ email: args.email })
		if (!user) return credentialNotValid
		const passwordIsValid = await bcrypt.compare(args.password, user.password)
		if (!passwordIsValid) return credentialNotValid
		user = user.transform()
		token = createToken(user, {
			issuer: 'AnyPlace',
			subject: 'contacto@anyplace.cl',
			audience: 'https://anyplace.cl'
		})
	} catch (error) {
		return {
			__typename: 'InternalServerError',
			code: 500,
			success: true,
			message: `Error login user with email: ${args.email} .`
		}
	}

	return {
		__typename: 'UserLoginResultSuccess',
		code: 200,
		success: true,
		message: `User login successfully`,
		user,
		token
	}
}

/**
 * auth user login
 * @param connection database connection
 * @param id user id
 * @returns {true | false} true or false 
 */
export const getUserToken = async (connection: any, userCurrent: IUser) => {
	let user: IUser | null

	try {
		user = await UserModel(connection).findById(userCurrent.id)
		if (user !== null) {
			user = user.transform()
		}
	} catch (error) {
		console.error('> getUser error: ', error)
		return {
			__typename: 'InternalServerError',
			code: 500,
			success: false,
			message: `Error get user token with the id ${userCurrent.id} .`
		}
	}

	if (user === null) {
		return {
			__typename: 'UnauthorizedError',
			code: 401,
			success: false,
			message: `No Unauthorized.`
		}
	}

	return {
		__typename: 'UserTokenResultSuccess',
		code: 200,
		success: true,
		message: `The user with the id ${userCurrent.id} found successfully.`,
		user
	}
}
