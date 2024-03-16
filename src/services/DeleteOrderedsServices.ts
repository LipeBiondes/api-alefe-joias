import prismaClient from '../prisma'

interface DeleteOrderedsProps {
  id: string
}

class DeleteOrderedsServices {
  async execute({ id }: DeleteOrderedsProps) {
    if (!id) {
      throw new Error('Invalid id')
    }

    const deleteOrdered = await prismaClient.pedido.delete({
      where: {
        id: id
      }
    })

    if (!deleteOrdered) {
      throw new Error('No order found')
    }
    return deleteOrdered
  }
}

export { DeleteOrderedsServices }
