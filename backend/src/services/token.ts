import fs from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'
import UserModel, { IUser } from '../models/UserModel'
import dotenv from 'dotenv'
dotenv.config()

const privateKEY = fs.readFileSync(path.join(__dirname, '../keys/private.key'), 'utf8')
const publicKEY = fs.readFileSync(path.join(__dirname, '../keys/public.key'), 'utf8')

export interface IOptions {
	issuer: string
	subject: string
	audience: string
}

export interface IPayload {
	id: string
	email: string
	iat: number
	exp: number
	aud: string
	iss: string
	sub: string
}

/**
 * create JWT
 * @param user IUser user data
 * @param $Options options token
 * @returns {string} token
 */
export const createToken = (user: IUser, $Options: IOptions): string => {
	const payload = {
		id: user.id
	}

	const signOptions = {
		issuer: $Options.issuer,
		subject: $Options.subject,
		audience: $Options.audience,
		expiresIn: '14d',
		algorithm: 'RS256'
	}

	return jwt.sign(payload, privateKEY, signOptions)
}

/**
 * valid JWT
 * @param user user data
 * @returns {user} user data
 */
export const validToken = async (connection: any, token: string, $Options: IOptions) => {
	const verifyOptions = {
		issuer: $Options.issuer,
		subject: $Options.subject,
		audience: $Options.audience,
		expiresIn: '14d',
		algorithms: [ 'RS256' ]
	}
	let user: IUser | null
	try {
		const payloadUser = jwt.verify(token, publicKEY, verifyOptions)
		user = await UserModel(connection).findById(payloadUser.id, 'role')
		if (user !== null) user = user.transform()
		else return null
	} catch (err) {
		return null
	}
	return user
}

/**
 * decode JWT
 * @param user user data
 * @returns {token} token
 */
export const decodeToken = (token: string): IPayload => {
	return jwt.decode(token, { complete: true })
}
