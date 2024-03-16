import { FastifyRequest, FastifyReply } from 'fastify'
import {
  CreateEmployeeServices,
  verifyEmailEmployeeServices
} from '../services/CreateEmployeeServices'

class CreateEmployeeController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password, admin } = request.body as {
      name: string
      email: string
      password: string
      admin: boolean
    }

    // Verificando se o email já está cadastrado
    try {
      const verifyEmailEmployeeService = new verifyEmailEmployeeServices()
      const verifyEmail = await verifyEmailEmployeeService.execute({ email })
      if (verifyEmail) {
        return reply.code(400).send({ error: 'Email já cadastrado' })
      }
    } catch (error) {
      return reply.code(500).send({ error: 'Erro ao verificar email' })
    }

    // Criando o funcionário
    try {
      const createEmployeeServices = new CreateEmployeeServices()
      const funcionario = await createEmployeeServices.execute({
        name,
        email,
        password,
        admin
      })

      return reply.code(201).send(funcionario)
    } catch (error) {
      return reply.code(500).send({ error: 'Erro ao criar funcionário' })
    }
  }
}

export { CreateEmployeeController }
