import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/client-error'

export async function getProductById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/products/:idProduct',
    {
      schema: {
        params: z.object({
          idProduct: z.string().uuid()
        }),
        response: {
          201: z.object({
            referencia: z.string(),
            nome: z.string(),
            quantidade: z.number(),
            descricao: z.string(),
            preco: z.number()
          })
        }
      }
    },
    async (request, reply) => {
      const { idProduct } = request.params

      const produto = await prisma.produto.findFirst({
        select: {
          referencia: true,
          nome: true,
          quantidade: true,
          descricao: true,
          preco: true
        },
        where: {
          id: idProduct
        }
      })

      if (!produto) {
        throw new ClientError('Produto não encontrado')
      }

      return reply.status(201).send({
        ...produto
      })
    }
  )
}
