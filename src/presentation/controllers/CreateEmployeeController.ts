import { inject, injectable } from 'tsyringe'
import { IController } from '../interfaces/IController'
import { IHttpRequest } from '../interfaces/IHttpRequest'
import { created } from '../adapters/HttpResponseAdapter'
import { IHttpResponse } from '../interfaces/IHttpResponse'
import { ICreateEmployeeUseCase } from '../../domain/usecases/CreateEmployee/ICreateEmployee'

@injectable()
export class CreateEmployeeController implements IController {
  constructor(
    @inject('ICreateEmployeeUseCase')
    readonly createEmployeeUseCase: ICreateEmployeeUseCase
  ) { }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { username, email, password } = httpRequest.body

    const result = await this.createEmployeeUseCase.create({ username, email, password })

    return created(result, 'Employee created')
  }
} 