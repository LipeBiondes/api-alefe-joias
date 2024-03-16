import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply
} from 'fastify'
import { CreateClientsController } from './controllers/CreateClientsController'
import { ListClientController } from './controllers/ListClientController'
import { DeleteClientController } from './controllers/DeleteClientsController'
import { CreateEmployeeController } from './controllers/CreateEmployeeController'
import { ListEmployeeController } from './controllers/ListEmployeeController'
import { DeleteEmployeeController } from './controllers/DeleteEmployeeController'
import { UpdateClientController } from './controllers/UpdateClientController'
import { UpdateEmployeeController } from './controllers/UpdateEmployeeController'
import { ListProductsController } from './controllers/ListProductsController'
import { CreateProductsController } from './controllers/CreateProductsController'
import { DeleteProductsController } from './controllers/DeleteProductsController'
import { UpdateProductsController } from './controllers/UpdateProductsController'
import { ListOrderedsController } from './controllers/ListOrderedsController'
import { CreateOrderedsController } from './controllers/CreateOrderedsController'
import { UpdateOrderedsController } from './controllers/UpdateOrderedsController'
import { DeleteOrderedsController } from './controllers/DeleteOrderedsController'

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get(
    '/client',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListClientController().handle(request, reply)
    }
  )
  fastify.post(
    '/client',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateClientsController().handle(request, reply)
    }
  )
  fastify.put(
    '/client/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UpdateClientController().handle(request, reply)
    }
  )
  fastify.delete(
    '/client',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteClientController().handle(request, reply)
    }
  )
  fastify.get(
    '/employee',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListEmployeeController().handle(request, reply)
    }
  )
  fastify.post(
    '/employee',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateEmployeeController().handle(request, reply)
    }
  )
  fastify.put(
    '/employee/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UpdateEmployeeController().handle(request, reply)
    }
  )
  fastify.delete(
    '/employee',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteEmployeeController().handle(request, reply)
    }
  )
  fastify.get(
    '/products',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListProductsController().handle(request, reply)
    }
  )
  fastify.post(
    '/products',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateProductsController().handle(request, reply)
    }
  )
  fastify.put(
    '/products/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UpdateProductsController().handle(request, reply)
    }
  )
  fastify.delete(
    '/products',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteProductsController().handle(request, reply)
    }
  )
  fastify.get(
    '/ordered',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListOrderedsController().handle(request, reply)
    }
  )
  fastify.post(
    '/ordered',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateOrderedsController().handle(request, reply)
    }
  )
  fastify.put(
    '/ordered/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UpdateOrderedsController().handle(request, reply)
    }
  )
  fastify.delete(
    '/ordered',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteOrderedsController().handle(request, reply)
    }
  )
}
