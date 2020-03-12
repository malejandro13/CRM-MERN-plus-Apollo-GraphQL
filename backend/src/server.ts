import express from 'express'
import dotenv from 'dotenv'
import { createServer } from 'http'
import compression from 'compression'
import cors from 'cors'

const app = express()
dotenv.config()

const port: string = process.env.PORT as string | '3000'

import apolloServer from './graphql'

const corsOptions = {
	origin: '*',
	credentials: true
}

app.use(cors(corsOptions))
app.use(compression())
apolloServer.applyMiddleware({ app, path: '/graphql', cors: false })
const httpServer = createServer(app)
httpServer.listen({ port }, (): void =>
	console.log(`\n🚀      GraphQL is now running on http://localhost:${port}/graphql`)
)
