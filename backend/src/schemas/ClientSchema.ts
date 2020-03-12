import { gql } from 'apollo-server-express'

/**
 * @description holds client schema
 */

const ClientSchema = gql`
	type Email {
		email: String
	}

	enum ClientType {
		BASIC
		PREMIUM
	}

	type Client {
		id: ID
		name: String
		surname: String
		company: String
		emails: [Email]
		age: Int
		type: ClientType
	}

	type ClientResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		client: Client!
	}

	type ClientsResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		clients: [Client]
	}

	type TotalClientsResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		total: Int
	}

	union ClientResult = ClientResultSuccess | NotFoundError | InternalServerError | UnauthorizedError

	union ClientsResult = ClientsResultSuccess | InternalServerError | UnauthorizedError

	union TotalClientsResult = TotalClientsResultSuccess | InternalServerError | UnauthorizedError

	input EmailInput {
		email: String
	}

	type ClientCreateOrUpdateResultSuccess implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		client: Client!
	}

	type ClientInvalidInputError implements DefaultResponseInterface {
		code: Int!
		success: Boolean!
		message: String!
		nameErrorMessage: String
		surnameErrorMessage: String
		companyErrorMessage: String
		ageErrorMessage: String
		typeErrorMessage: String
		emailsErrorMessage: String
	}

	input ClientRegisterInput {
		name: String!
		surname: String!
		company: String!
		emails: [EmailInput]
		age: Int!
		type: ClientType!
	}

	input ClientUpdateInput {
		id: ID!
		name: String!
		surname: String!
		company: String!
		emails: [EmailInput]
		age: Int!
		type: ClientType!
	}

	union ClientCreateOrUpdateResult =
		  ClientCreateOrUpdateResultSuccess
		| ClientInvalidInputError
		| InternalServerError
		| UnauthorizedError

	extend type Subscription {
		clientAdded: Client
	}

	extend type Query {
		getClients(limit: Int, since: Int): ClientsResult
		totalClientCount: TotalClientsResult
		getClient(id: ID!): ClientResult
	}

	extend type Mutation {
		createClient(input: ClientRegisterInput): ClientCreateOrUpdateResult
		updateClient(input: ClientUpdateInput): ClientCreateOrUpdateResult
		deleteClient(id: ID!): ClientResult
	}
`

export default ClientSchema
