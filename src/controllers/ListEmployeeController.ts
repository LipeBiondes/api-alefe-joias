import { FastifyRequest, FastifyReply } from 'fastify'
import { ListEmployeeServices } from '../services/ListEmployeeServices'

class ListEmployeeController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email } = request.query as { email: string }

    try {
      const listEmployeeServices = new ListEmployeeServices()
      const employee = await listEmployeeServices.execute({ email })
      if (!employee) {
        return reply.status(404).send({ error: 'Employee not found' })
      }
      return reply.send(employee)
    } catch (error) {
      return reply.code(500).send({ error: 'Error to list employee' })
    }
  }
}

export { ListEmployeeController }
