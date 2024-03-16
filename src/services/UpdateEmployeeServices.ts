import prismaClient from '../prisma'

interface UpdateEmployeeProps {
  id: string
  name: string
  password: string
  admin?: boolean
}

class UpdateEmployeeServices {
  async execute({ id, name, password, admin = false }: UpdateEmployeeProps) {
    if (!id) {
      throw new Error('Id is required')
    }
    const employee = await prismaClient.funcionarios.update({
      where: { id },
      data: {
        name,
        password,
        admin
      }
    })
    return employee
  }
}

export { UpdateEmployeeServices }
