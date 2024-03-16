import { FastifyRequest, FastifyReply } from 'fastify'
import { DeleteEmployeeService } from '../services/DeleteEmployeeServices'

class DeleteEmployeeController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as { id: string }

    try {
      const employeeService = new DeleteEmployeeService()
      const employee = await employeeService.execute({ id })

      return reply.send(employee)
    } catch (error) {
      return reply.code(500).send({ error: 'Erro ao deletar funcionário' })
    }
  }
}

export { DeleteEmployeeController }
