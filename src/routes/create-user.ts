import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/client-error'

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        body: z.object({
          nome: z.string().min(4),
          email: z.string().email(),
          senha: z.string().min(6),
          numero: z.string().min(11),
          cpf: z.string().min(11)
        }),
        response: {
          200: z.object({
            userId: z.string().uuid()
          })
        }
      }
    },
    async (request, reply) => {
      const { nome, email, senha, numero, cpf } = request.body

      const usuarioExiste = await prisma.usuario.findFirst({
        where: {
          email
        }
      })

      if (usuarioExiste) {
        throw new ClientError('Usuário já existe')
      }

      const usuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha,
          numero,
          cpf
        }
      })

      return reply.status(201).send({
        userId: usuario.id
      })
    }
  )
}
