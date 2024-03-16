import prismaClient from '../prisma'

interface PhoneClientProps {
  email: string
}

class ListClientServices {
  async execute({ email }: PhoneClientProps) {
    if (!email) {
      const clients = await prismaClient.clientes.findMany()
      return clients
    }
    const client = await prismaClient.clientes.findFirst({
      where: {
        email: email
      }
    })
    return client
  }
}

export { ListClientServices }
