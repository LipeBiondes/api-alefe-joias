import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/client-error'

export async function getClass(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/product/classes',
    {
      schema: {
        response: {
          201: z.object({
            classes: z.array(
              z.object({
                nome: z.string(),
                produtos: z.array(
                  z.object({
                    referencia: z.string(),
                    nome: z.string(),
                    quantidade: z.number(),
                    descricao: z.string(),
                    preco: z.number()
                  })
                )
              })
            )
          })
        }
      }
    },
    async (request, reply) => {
      const classes = await prisma.classe.findMany({
        select: {
          nome: true,
          produtos: {
            select: {
              referencia: true,
              nome: true,
              quantidade: true,
              descricao: true,
              preco: true
            }
          }
        }
      })

      if (!classes) {
        throw new ClientError('Classe não encontrada')
      }

      return reply.status(201).send({
        classes
      })
    }
  )
}
