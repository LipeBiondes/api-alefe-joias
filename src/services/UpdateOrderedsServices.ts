import prismaClient from '../prisma'

interface UpdateOrderedsProps {
  id: string
  progress: string
  delivered_at?: Date
}

class UpdateOrderedsServices {
  async execute({ id, progress, delivered_at }: UpdateOrderedsProps) {
    if (!id) {
      throw new Error('id not provided')
    }

    const findOrdered = await prismaClient.pedido.findUnique({
      where: {
        id: id
      }
    })

    if (!findOrdered) {
      throw new Error('No order found')
    }

    if (findOrdered?.progress === 'entregue') {
      throw new Error('Order already delivered')
    }

    if (delivered_at) {
      const updateOrdered = await prismaClient.pedido.update({
        where: {
          id: id
        },
        data: {
          progress: progress,
          delivered_at: delivered_at
        }
      })

      if (!updateOrdered) {
        throw new Error('No order found')
      }
      return updateOrdered
    }

    const updateOrdered = await prismaClient.pedido.update({
      where: {
        id: id
      },
      data: {
        progress: progress
      }
    })

    if (!updateOrdered) {
      throw new Error('No order found')
    }
    return updateOrdered
  }
}

export { UpdateOrderedsServices }
