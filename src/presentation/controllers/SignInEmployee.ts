import { inject, injectable } from 'tsyringe'
import { IController } from '../interfaces/IController'
import { IHttpRequest } from '../interfaces/IHttpRequest'
import { ok } from '../adapters/HttpResponseAdapter'
import { IHttpResponse } from '../interfaces/IHttpResponse'
import { ISignInEmployeeUseCase } from '../../domain/usecases/SignInEmployee/ISignInEmployee'

@injectable()
export class SignInEmployeeController implements IController {
  constructor(
    @inject('ISignInEmployeeUseCase')
    readonly signInEmployeeUseCase: ISignInEmployeeUseCase
  ) { }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { email, password } = httpRequest.body

    const result = await this.signInEmployeeUseCase.get({ email, password })

    return ok(result, 'Login successful')
  }
} 