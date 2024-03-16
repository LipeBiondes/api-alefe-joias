import prismaClient from '../prisma'

interface ListProductsProps {
  ref: string
}

class ListProductsServices {
  async execute({ ref }: ListProductsProps) {
    if (!ref) {
      const products = await prismaClient.produto.findMany()
      return products
    }
    const product = await prismaClient.produto.findFirst({
      where: {
        ref: ref
      }
    })
    if (!product) {
      return { error: 'Product not found' }
    }
    return product
  }
}

export { ListProductsServices }
