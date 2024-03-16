import prismaClient from '../prisma'

interface UpdateClientProps {
  id: string
  name: string
  phone: string
}

class UpdateClientServices {
  async execute({ id, name, phone }: UpdateClientProps) {
    if (!id) {
      throw new Error('Id is required')
    }

    const client = await prismaClient.clientes.update({
      where: {
        id
      },
      data: {
        name,
        phone
      }
    })
    return client
  }
}

export { UpdateClientServices }
