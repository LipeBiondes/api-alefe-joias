import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateProductsServices } from '../services/CreateProductsServices'

class CreateProductsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { ref, brand, name, price, amount_in_stock, url_Image } =
      request.body as {
        ref: string
        brand: string
        name: string
        price: number
        amount_in_stock: number
        url_Image: string
      }

    // Criando o produto
    try {
      const createProductsServices = new CreateProductsServices()
      const product = await createProductsServices.execute({
        ref,
        brand,
        name,
        price,
        amount_in_stock,
        url_Image
      })
      return reply.send(product)
    } catch (error) {
      return reply.code(500).send({ error: 'Erro ao criar produto' })
    }
  }
}

export { CreateProductsController }
