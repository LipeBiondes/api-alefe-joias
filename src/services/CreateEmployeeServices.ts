import prismaClient from '../prisma'

interface CreateEmployeeProps {
  name: string
  email: string
  password: string
  admin?: boolean
}

interface verifyEmailEmployeeProps {
  email: string
}

class CreateEmployeeServices {
  async execute({ name, email, password, admin = false }: CreateEmployeeProps) {
    const employee = await prismaClient.funcionarios.create({
      data: {
        name,
        email,
        password,
        admin
      }
    })
    return employee
  }
}

class verifyEmailEmployeeServices {
  async execute({ email }: verifyEmailEmployeeProps) {
    const employee = await prismaClient.funcionarios.findFirst({
      where: { email: email }
    })
    if (employee) {
      throw new Error('Email já cadastrado')
    }
    return false
  }
}

export { CreateEmployeeServices, verifyEmailEmployeeServices }
