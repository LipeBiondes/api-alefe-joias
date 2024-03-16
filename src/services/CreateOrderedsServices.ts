import prismaClient from '../prisma'

interface CreateOrderedsProps {
  client_id: string
  employee_id: string
  productIds: string[]
  total: number
  progress: string
}

class CreateOrderedsServices {
  async execute({
    client_id,
    employee_id,
    productIds,
    total,
    progress
  }: CreateOrderedsProps) {
    if (!client_id || !employee_id || !productIds || !total || !progress) {
      throw new Error('Invalid data')
    }

    const products = await prismaClient.produto.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    })

    if (!products || products.length !== productIds.length) {
      throw new Error('One or more products not found')
    }

    const createOrdered = await prismaClient.pedido.create({
      data: {
        client_id,
        employee_id,
        products,
        total,
        progress
      }
    })

    if (!createOrdered) {
      throw new Error('Failed to create order')
    }

    return createOrdered
  }
}

export { CreateOrderedsServices }
