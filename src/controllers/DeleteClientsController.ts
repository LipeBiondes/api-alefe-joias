import { FastifyRequest, FastifyReply } from 'fastify'
import { DeleteClientService } from '../services/DeleteClientService'

class DeleteClientController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    // Deletando o cliente
    try {
      const customerService = new DeleteClientService()
      const customer = await customerService.execute({ id })

      return reply.send(customer)
    } catch (error) {
      return reply.code(500).send({ error: 'Erro ao deletar cliente' })
    }
  }
}

export { DeleteClientController }
