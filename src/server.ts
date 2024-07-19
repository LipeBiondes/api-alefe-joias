import fastify from 'fastify'
import cors from '@fastify/cors'
import {
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'

import { env } from './env'
import { errorHandle } from './error-handle'
import { createUser } from './routes/create-user'
import { createEmployee } from './routes/create-employee'
import { createProduct } from './routes/create-product'
import { createOrder } from './routes/create-order'
import { createClass } from './routes/create-class'
import { getProductById } from './routes/get-product-by-id'
import { getProductByReference } from './routes/get-product-by-reference'
import { getClass } from './routes/get-class'

const app = fastify()

app.register(cors, {
  origin: '*'
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandle)

app.register(createUser)

app.register(createEmployee)

app.register(createProduct)
app.register(getProductById)
app.register(getProductByReference)

app.register(createOrder)

app.register(createClass)
app.register(getClass)

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is running on: http://localhost:${env.PORT}`)
})
