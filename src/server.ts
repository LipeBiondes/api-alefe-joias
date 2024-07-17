import fastify from 'fastify'
import cors from '@fastify/cors'
import {
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'

import { env } from './env'
import { errorHandle } from './error-handle'

const app = fastify()

app.register(cors, {
  origin: '*'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandle)

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is running on: http://localhost:${env.PORT}`)
})
