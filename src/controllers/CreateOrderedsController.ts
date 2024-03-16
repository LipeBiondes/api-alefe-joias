import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateOrderedsServices } from '../services/CreateOrderedsServices'

class CreateOrderedsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { client_id, employee_id, productIds, total, progress } =
      request.body as {
        client_id: string
        employee_id: string
        productIds: string[]
        total: number
        progress: string
      }
    if (!client_id || !employee_id || !productIds || !total || !progress) {
      return reply.status(400).send({ message: 'Invalid data' })
    }

    try {
      const createOrderedsServices = new CreateOrderedsServices()
      const ordered = await createOrderedsServices.execute({
        client_id,
        employee_id,
        productIds,
        total,
        progress
      })
      return reply.send(ordered)
    } catch (error) {
      return reply.status(500).send({ message: 'Failed to create order' })
    }
  }
}

export { CreateOrderedsController }
