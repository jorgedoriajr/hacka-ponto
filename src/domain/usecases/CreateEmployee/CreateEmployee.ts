import { inject, injectable } from 'tsyringe'
import { IEmployeeRepository } from '../../ports/repositories/Employee'
import { ICreateEmployeeUseCase } from './ICreateEmployee'
import { CreateEmployeeDTO } from './CreateEmployeeDTO'
import { Employee } from '../../entities/Employee'
import { MissingNecessaryDataError } from '../../errors/MissingNecessaryData'
import { EmployeeAlreadyExistsError } from '../../errors/EmployeeAlreadyExists'
import BcryptService from '../../../infra/security/BcryptService'

@injectable()
export class CreateEmployeeUseCase implements ICreateEmployeeUseCase {
  constructor(
    @inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository
  ) { }

  async create(params: CreateEmployeeDTO): Promise<Employee> {
    const { username, email, password } = params

    if (!email || !username || !password) throw new MissingNecessaryDataError()

    await this.checkIfEmployeeAlreadyExists(email)

    const hashedPassword = await BcryptService.encryptPassword(password)

    const employee = new Employee({ email, username, password: hashedPassword })

    const isCreated = await this.employeeRepository.create(employee)

    if (!isCreated) throw new Error('Employee not created')

    const createdEmployee = await this.employeeRepository.getById(employee.id)

    return createdEmployee!
  }

  private async checkIfEmployeeAlreadyExists(email: string) {
    const employeeExists = await this.employeeRepository.getByEmail(email)

    if (employeeExists) throw new EmployeeAlreadyExistsError()

  }
}