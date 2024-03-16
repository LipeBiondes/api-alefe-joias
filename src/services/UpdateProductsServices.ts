import prismaClient from '../prisma'

interface UpdateProductsProps {
  id: string
  ref?: string
  brand?: string
  name?: string
  price?: number
  amount_in_stock?: number
  url_Image?: string
}

class UpdateProductsServices {
  async execute({
    id,
    ref,
    brand,
    name,
    price,
    amount_in_stock,
    url_Image
  }: UpdateProductsProps) {
    if (!id) {
      throw new Error('Id is required')
    }
    const product = await prismaClient.produto.update({
      where: {
        id: id
      },
      data: {
        ref,
        brand,
        name,
        price,
        amount_in_stock,
        url_Image
      }
    })
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  }
}

export { UpdateProductsServices }
