import { FastifyRequest, FastifyReply } from 'fastify'
import { ListOrderedsServices } from '../services/ListOrderedsServices'

class ListOrderedsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { client_id } = request.query as { client_id: string }

    try {
      const listOrderedsServices = new ListOrderedsServices()
      const ordered = await listOrderedsServices.execute({ client_id })
      if (!ordered) {
        return reply.status(404).send({ error: 'No orders found' })
      }
      return reply.send(ordered)
    } catch (error) {
      return reply.code(500).send({ error: 'Error to list orders' })
    }
  }
}

export { ListOrderedsController }
