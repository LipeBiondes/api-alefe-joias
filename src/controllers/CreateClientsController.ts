import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateClientsServices } from '../services/CreateClientsServices'
import { verifyEmailClientServices } from '../services/CreateClientsServices'

class CreateClientsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, phone } = request.body as {
      name: string
      email: string
      phone: string
    }
    // Verificando se o email já está cadastrado
    try {
      const verifyEmailClientService = new verifyEmailClientServices()
      const verifyEmail = await verifyEmailClientService.execute({ email })
      if (verifyEmail) {
        return reply.code(400).send({ error: 'Email já cadastrado' })
      }
    } catch (error) {
      return reply.code(500).send({ error: 'Erro ao verificar email' })
    }

    // Criando o cliente
    try {
      const clientService = new CreateClientsServices()
      const client = await clientService.execute({ name, email, phone })
      return reply.send(client)
    } catch (error) {
      return reply.code(500).send({ error: 'Erro ao criar cliente' })
    }
  }
}

export { CreateClientsController }
