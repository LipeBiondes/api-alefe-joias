import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/client-error'

export async function createClass(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/products/classes',
    {
      schema: {
        body: z.object({
          nome: z.string().min(4),
          produtos: z.array(
            z.object({
              id: z.string().uuid()
            })
          )
        }),
        response: {
          200: z.object({
            classId: z.string().uuid()
          })
        }
      }
    },
    async (request, reply) => {
      const { nome, produtos } = request.body

      const procurarProdutos = await prisma.produto.findMany({
        where: {
          id: {
            in: produtos.map(produto => produto.id)
          }
        }
      })

      if (procurarProdutos.length !== produtos.length) {
        throw new ClientError('Produto não encontrado')
      }

      const classe = await prisma.classe.create({
        data: {
          nome,
          produtos: {
            connect: procurarProdutos.map(produto => ({
              id: produto.id
            }))
          }
        }
      })

      return reply.status(201).send({
        classId: classe.id
      })
    }
  )
}
