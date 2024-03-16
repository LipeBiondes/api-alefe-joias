import { FastifyRequest, FastifyReply } from 'fastify'
import { ListClientServices } from '../services/ListClientServices'
class ListClientController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email } = request.query as { email: string }

    try {
      const listClientServices = new ListClientServices()
      const client = await listClientServices.execute({ email })
      if (!client) {
        return reply.status(404).send({ error: 'Client not found' })
      }
      return reply.send(client)
    } catch (error) {
      return reply.code(500).send({ error: 'Error to list client' })
    }
  }
}

export { ListClientController }
