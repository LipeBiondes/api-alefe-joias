import prismaClient from '../prisma'

interface DeleteProductsServicesProps {
  id: string
}

class DeleteProductsServices {
  async execute({ id }: DeleteProductsServicesProps) {
    if (!id) {
      throw new Error('Customer ID is required')
    }

    const findPoduct = await prismaClient.produto.findFirst({
      where: { id: id }
    })

    if (!findPoduct) {
      throw new Error('Produto não econtrado')
    }
    await prismaClient.produto.delete({ where: { id: findPoduct.id } })

    return { message: 'Produto deletado com sucesso' }
  }
}
export { DeleteProductsServices }
