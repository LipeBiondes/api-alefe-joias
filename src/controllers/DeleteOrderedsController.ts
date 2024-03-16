import { FastifyRequest, FastifyReply } from 'fastify'
import { DeleteOrderedsServices } from '../services/DeleteOrderedsServices'

class DeleteOrderedsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    try {
      const deleteOrderedsService = new DeleteOrderedsServices()
      const ordered = await deleteOrderedsService.execute({ id })

      return reply.send(ordered)
    } catch (error) {
      return reply.code(500).send({ error: 'Error to delete order' })
    }
  }
}

export { DeleteOrderedsController }
