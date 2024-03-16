import { FastifyRequest, FastifyReply } from 'fastify'
import { ListProductsServices } from '../services/ListProductsServices'

class ListProductsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { ref } = request.query as { ref: string }

    try {
      const listProductsServices = new ListProductsServices()
      const product = await listProductsServices.execute({ ref })
      if (!product) {
        return reply.status(404).send({ error: 'Product not found' })
      }
      return reply.send(product)
    } catch (error) {
      return reply.code(500).send({ error: 'Error to list product' })
    }
  }
}

export { ListProductsController }
