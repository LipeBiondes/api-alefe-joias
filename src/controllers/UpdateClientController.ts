import { FastifyRequest, FastifyReply } from 'fastify'
import { UpdateClientServices } from '../services/UpdateClientServices'

class UpdateClientController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }
    const { name, phone } = request.body as {
      name: string
      phone: string
    }

    if (!id) {
      return reply.status(400).send({ error: 'Id is required' })
    }

    // Atualizando o cliente
    try {
      const clientService = new UpdateClientServices()
      const client = await clientService.execute({ id, name, phone })
      return reply.send(client)
    } catch (error) {
      return reply.code(500).send({ error: 'Error to update client' })
    }
  }
}

export { UpdateClientController }
