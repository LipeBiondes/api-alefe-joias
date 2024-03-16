import prismaClient from '../prisma'

interface CreateClientProps {
  name: string
  email: string
  phone: string
}

interface verifyEmailClientProps {
  email: string
}

class CreateClientsServices {
  async execute({ name, email, phone }: CreateClientProps) {
    if (!name || !email || !phone) {
      throw new Error('Preencha todos os campos')
    }

    const client = await prismaClient.clientes.create({
      data: {
        name,
        email,
        phone
      }
    })
    return client
  }
}

class verifyEmailClientServices {
  async execute({ email }: verifyEmailClientProps) {
    const client = await prismaClient.clientes.findFirst({
      where: {
        email
      }
    })
    if (client) {
      throw new Error('Email já cadastrado')
    }
    return false
  }
}

export { CreateClientsServices, verifyEmailClientServices }
