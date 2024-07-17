import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/client-error'

export async function createProduct(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/products',
    {
      schema: {
        body: z.object({
          nome: z.string().min(4),
          descricao: z.string().min(4),
          referencia: z.string().min(4),
          preco: z.number().positive(),
          quantidade: z.number().positive()
        }),
        response: {
          200: z.object({
            productId: z.string().uuid()
          })
        }
      }
    },
    async (request, reply) => {
      const { nome, descricao, referencia, preco, quantidade } = request.body

      const produtoExiste = await prisma.produto.findFirst({
        where: {
          referencia
        }
      })

      if (produtoExiste) {
        throw new ClientError('Funcionário já existe')
      }

      const produto = await prisma.produto.create({
        data: {
          nome,
          descricao,
          referencia,
          preco,
          quantidade
        }
      })

      return reply.status(201).send({
        productId: produto.id
      })
    }
  )
}
