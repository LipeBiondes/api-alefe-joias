import Fastify from 'fastify'
import { routes } from './routes'
import cors from '@fastify/cors'
import dotenv from 'dotenv'

const port = parseInt(process.env.PORT ?? '3333')

const app = Fastify({ logger: true })

dotenv.config()

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message })
})
const start = async () => {
  await app.register(cors)
  await app.register(routes)

  try {
    await app.listen({ port: port })
  } catch (err) {
    process.exit(1)
  }
}

start()
