import { FastifyRequest, FastifyReply } from 'fastify'
import { DeleteProductsServices } from '../services/DeleteProductsServices'

class DeleteProductsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    try {
      const deleteProductsServices = new DeleteProductsServices()
      const product = await deleteProductsServices.execute({ id })
      return reply.send(product)
    } catch (error) {
      return reply.code(500).send({ error: 'Erro ao deletar produto' })
    }
  }
}

export { DeleteProductsController }
