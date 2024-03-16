import { FastifyRequest, FastifyReply } from 'fastify'
import { UpdateEmployeeServices } from '../services/UpdateEmployeeServices'

class UpdateEmployeeController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, password, admin } = request.body as {
      name: string
      password: string
      admin: boolean
    }
    const { id } = request.params as { id: string }

    if (!id) {
      return reply.status(400).send({ error: 'Id is required' })
    }
    try {
      // Atualizando o funcionário
      const employeeService = new UpdateEmployeeServices()
      const employee = await employeeService.execute({
        id,
        name,
        password,
        admin
      })
      return reply.send(employee)
    } catch (error) {
      return reply.code(500).send({ error: 'Error to update employee' })
    }
  }
}

export { UpdateEmployeeController }
