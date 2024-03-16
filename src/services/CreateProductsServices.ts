import prismaClient from '../prisma'

interface CreateProductsProps {
  ref: string
  brand: string
  name: string
  price: number
  amount_in_stock: number
  url_Image: string
}

class CreateProductsServices {
  async execute({
    ref,
    brand,
    name,
    price,
    amount_in_stock,
    url_Image
  }: CreateProductsProps) {
    if (!ref || !brand || !name || !price || !amount_in_stock || !url_Image) {
      throw new Error('Invalid data')
    }
    const product = await prismaClient.produto.create({
      data: {
        ref,
        brand,
        name,
        price,
        amount_in_stock,
        url_Image
      }
    })
    return product
  }
}

export { CreateProductsServices }
