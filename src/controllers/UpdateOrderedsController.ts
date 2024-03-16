import { FastifyRequest, FastifyReply } from 'fastify'
import { UpdateOrderedsServices } from '../services/UpdateOrderedsServices'

class UpdateOrderedsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }
    const { progress, delivered_at } = request.body as {
      progress: string
      delivered_at?: Date
    }

    if (!id) {
      return reply.status(400).send({ error: 'Id is required' })
    }

    try {
      const updateOrderedsService = new UpdateOrderedsServices()
      const ordered = await updateOrderedsService.execute({
        id,
        progress,
        delivered_at
      })
      if (!ordered) {
        return reply.status(404).send({ error: 'Order not found' })
      }
      return reply.send(ordered)
    } catch (error) {
      return reply.code(500).send({ error: 'Error to update order' })
    }
  }
}

export { UpdateOrderedsController }
