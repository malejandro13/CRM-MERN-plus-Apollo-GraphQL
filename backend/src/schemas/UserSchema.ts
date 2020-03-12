import { gql } from 'apollo-server-express'

/**
 * @description holds user schema
 */

const UserSchema = gql`
	enum UserRole {
		ADMINISTRATOR
		SELLER
	}

	type User {
		id: ID
		name: String
		email: String
		password: String
		role: UserRole
	}

	type UserResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		user: User!
	}

	type UserTokenResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		user: User!
	}

	type UsersResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		users: [User]
	}

	type TotalUsersResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		total: Int
	}

	union UserResult = UserResultSuccess | NotFoundError | InternalServerError | UnauthorizedError

	union UserTokenResult = UserTokenResultSuccess | InternalServerError | UnauthorizedError

	union UsersResult = UsersResultSuccess | InternalServerError | UnauthorizedError

	union TotalUsersResult = TotalUsersResultSuccess | InternalServerError | UnauthorizedError

	type UserCreateOrUpdateResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		user: User!
	}

	type UserInvalidInputError implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		loginErrorMessage: String
		nameErrorMessage: String
		emailErrorMessage: String
		passwordErrorMessage: String
		roleErrorMessage: String
	}

	type UserLoginResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		user: User
		token: String
	}

	input UserRegisterInput {
		name: String!
		email: String!
		password: String!
		role: String!
	}

	input UserLoginInput {
		email: String!
		password: String!
	}

	union UserCreateOrUpdateResult =
		  UserCreateOrUpdateResultSuccess
		| UserInvalidInputError
		| InternalServerError
		| UnauthorizedError

	union UserLoginResult = UserLoginResultSuccess | UserInvalidInputError | InternalServerError

	extend type Query {
		getUsers(limit: Int, since: Int): UsersResult
		totalUserCount: TotalUsersResult
		getUser(id: ID!): UserResult
		getUserToken: UserTokenResult
	}

	extend type Mutation {
		createUser(input: UserRegisterInput): UserCreateOrUpdateResult
		deleteUser(id: ID!): UserResult
		loginUser(input: UserLoginInput): UserLoginResult
	}
`

export default UserSchema
