import { inject, injectable } from 'tsyringe'
import { IEmployeeRepository } from '../../ports/repositories/Employee'
import { ISignInEmployeeUseCase } from './ISignInEmployee'
import { MissingNecessaryDataError } from '../../errors/MissingNecessaryData'
import { SignInEmployeeDTO } from './SignInEmployeeDTO'
import { WrongCredentialsError } from '../../errors/WrongCredentials'
import BcryptService from '../../../infra/security/BcryptService'
import { JwtAuthenticationService } from '../../../infra/security/JwtAuthenticationService'

@injectable()
export class SignInEmployeeUseCase implements ISignInEmployeeUseCase {
  constructor(
    @inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository
  ) { }

  async get(params: SignInEmployeeDTO): Promise<{ token: string }> {
    const { email, password } = params

    if (!email || !password) throw new MissingNecessaryDataError()

    const employee = await this.getEmployeeByEmail(email)

    const isPasswordCorrect = await BcryptService.validatePassword(password, employee.password)

    if (!isPasswordCorrect) throw new WrongCredentialsError()

    const token = JwtAuthenticationService.generateToken({ id: employee.id })

    return { token }
  }

  private async getEmployeeByEmail(email: string) {
    const found = await this.employeeRepository.getByEmail(email)

    if (!found) throw new WrongCredentialsError()

    return found
  }
}