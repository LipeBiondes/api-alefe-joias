import prismaClient from '../prisma'

interface DeleteEmployeeProps {
  id: string
}

class DeleteEmployeeService {
  async execute({ id }: DeleteEmployeeProps) {
    if (!id) {
      throw new Error('Customer ID is required')
    }

    const findEmployee = await prismaClient.funcionarios.findFirst({
      where: { id: id }
    })

    if (!findEmployee) {
      throw new Error('Funcionário não econtrado')
    }
    await prismaClient.funcionarios.delete({ where: { id: findEmployee.id } })

    return { message: 'Funcionário deletado com sucesso' }
  }
}
export { DeleteEmployeeService }
