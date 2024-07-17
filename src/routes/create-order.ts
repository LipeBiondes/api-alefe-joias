import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '../lib/prisma'
import { ClientError } from '../errors/client-error'

export async function createOrder(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/orders/:usuarioId/:funcionarioId',
    {
      schema: {
        params: z.object({
          usuarioId: z.string().uuid(),
          funcionarioId: z.string().uuid()
        }),
        body: z.object({
          produto: z.object({
            id: z.string().uuid(),
            quantidade: z.number().positive()
          })
        }),
        response: {
          200: z.object({
            orderId: z.string().uuid()
          })
        }
      }
    },
    async (request, reply) => {
      const { produto } = request.body
      const { usuarioId, funcionarioId } = request.params

      const status = 'PENDENTE'
      const usuario = await prisma.usuario.findUnique({
        where: {
          id: usuarioId
        }
      })

      if (!usuario) {
        throw new ClientError('Usuário não existe')
      }

      const funcionario = await prisma.funcionario.findUnique({
        where: {
          id: funcionarioId
        }
      })

      if (!funcionario) {
        throw new ClientError('Funcionário não existe')
      }

      const procurarProduto = await prisma.produto.findFirst({
        select: {
          id: true,
          nome: true,
          preco: true,
          quantidade: true,
          referencia: true
        },
        where: {
          id: produto.id
        }
      })

      if (!procurarProduto) {
        throw new ClientError('Produto não encontrado')
      }

      if (produto.quantidade > procurarProduto.quantidade) {
        throw new ClientError('Quantidade indisponível')
      }

      const total = produto.quantidade * procurarProduto.preco

      const pedido = await prisma.pedido.create({
        data: {
          total,
          quantidade: produto.quantidade,
          usuario_id: usuarioId,
          funcionario_id: funcionarioId,
          status,
          produtos: {
            connect: {
              id: produto.id
            }
          }
        }
      })

      await prisma.produto.update({
        where: {
          id: produto.id
        },
        data: {
          quantidade: {
            decrement: produto.quantidade
          }
        }
      })

      return reply.status(201).send({
        orderId: pedido.id
      })
    }
  )
}
