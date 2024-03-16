import { FastifyRequest, FastifyReply } from 'fastify'
import { UpdateProductsServices } from '../services/UpdateProductsServices'

class UpdateProductsController {
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
    const { id } = request.params as { id: string }

    if (!id) {
      return reply.status(400).send({ error: 'Id is required' })
    }

    // Atualizando o produto
    try {
      const productsService = new UpdateProductsServices()
      const product = await productsService.execute({
        id,
        ref,
        brand,
        name,
        price,
        amount_in_stock,
        url_Image
      })
      if (!product) {
        return reply.status(404).send({ error: 'Product not found' })
      }
      return reply.send(product)
    } catch (error) {
      return reply.code(500).send({ error: 'Error to update product' })
    }
  }
}

export { UpdateProductsController }
