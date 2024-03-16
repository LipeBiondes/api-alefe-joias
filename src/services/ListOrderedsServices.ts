import prismaClient from '../prisma'

interface ListOrderedsProps {
  client_id?: string
}

class ListOrderedsServices {
  async execute({ client_id }: ListOrderedsProps) {
    if (!client_id) {
      const listOrdereds = await prismaClient.pedido.findMany()
      return listOrdereds
    }

    const listOrdereds = await prismaClient.pedido.findMany({
      where: {
        client_id: client_id
      }
    })

    if (!listOrdereds) {
      throw new Error('No orders found')
    }
    return listOrdereds
  }
}

export { ListOrderedsServices }
