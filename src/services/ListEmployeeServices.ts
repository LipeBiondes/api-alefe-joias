import prismaClient from '../prisma'

interface ListEmployeeProps {
  email: string
}

class ListEmployeeServices {
  async execute({ email }: ListEmployeeProps) {
    if (!email) {
      const employee = await prismaClient.funcionarios.findMany()
      return employee
    }

    const employee = await prismaClient.funcionarios.findFirst({
      where: {
        email
      }
    })
    return employee
  }
}

export { ListEmployeeServices }
