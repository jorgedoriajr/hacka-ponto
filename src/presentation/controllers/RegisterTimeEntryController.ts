import { inject, injectable } from 'tsyringe'
import { IController } from '../interfaces/IController'
import { IHttpRequest } from '../interfaces/IHttpRequest'
import { ok } from '../adapters/HttpResponseAdapter'
import { IHttpResponse } from '../interfaces/IHttpResponse'
import { IRegisterTimeEntryUseCase } from '../../domain/usecases/RegisterTimeEntry/IRegisterTimeEntry'

@injectable()
export class RegisterTimeEntryController implements IController {
  constructor(
    @inject('IRegisterTimeEntryUseCase')
    readonly registerTimeEntryUseCase: IRegisterTimeEntryUseCase
  ) { }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { employeeId, type } = httpRequest.body

    await this.registerTimeEntryUseCase.register({ employeeId, type })

    return ok({ message: 'Registered' })
  }
} 