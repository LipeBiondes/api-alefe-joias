import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/client-error'

export async function createEmployee(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/employees',
    {
      schema: {
        body: z.object({
          nome: z.string().min(4),
          email: z.string().email(),
          senha: z.string().min(6)
        }),
        response: {
          200: z.object({
            employeeId: z.string().uuid()
          })
        }
      }
    },
    async (request, reply) => {
      const { nome, email, senha } = request.body

      const funcionarioExiste = await prisma.funcionario.findFirst({
        where: {
          email
        }
      })

      if (funcionarioExiste) {
        throw new ClientError('Funcionário já existe')
      }

      const funcionario = await prisma.funcionario.create({
        data: {
          nome,
          email,
          senha
        }
      })

      return reply.status(201).send({
        employeeId: funcionario.id
      })
    }
  )
}
