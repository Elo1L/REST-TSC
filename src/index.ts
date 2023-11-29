import fastify from 'fastify'
import userRouter from './routes/user.router'
import {initDB} from './db/initDB'

import 'dotenv/config'

const port = 5000;

const startServer = async () => {
	try{
		await initDB()
		console.log('Database created')
	} catch (e) {
		console.error(e)
	}
	
	try {
	const server = fastify()

	const errorHandler = (error, address) => {
  	server.log.error(error, address);
	}

	server.register(userRouter, { prefix: '/api/user' })

	await server.listen({ port }, errorHandler)
  } catch (e) {
	console.error(e)
  }
}

process.on('unhandledRejection', (e) => {
  console.error(e)
  process.exit(1)
})

startServer()

