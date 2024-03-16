import prismaClient from '../prisma'

interface DeleteClientProps {
  id: string
}

class DeleteClientService {
  async execute({ id }: DeleteClientProps) {
    if (!id) {
      throw new Error('Customer ID is required')
    }

    const findClient = await prismaClient.clientes.findFirst({
      where: { id: id }
    })

    if (!findClient) {
      throw new Error('Cliente não econtrado')
    }
    await prismaClient.clientes.delete({ where: { id: findClient.id } })

    return { message: 'Cliente deletado com sucesso' }
  }
}
export { DeleteClientService }
