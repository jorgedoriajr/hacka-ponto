import { inject, injectable } from 'tsyringe'
import { IController } from '../interfaces/IController'
import { IHttpRequest } from '../interfaces/IHttpRequest'
import { ok } from '../adapters/HttpResponseAdapter'
import { IHttpResponse } from '../interfaces/IHttpResponse'
import { ISendMonthlyReportToEmployeeUseCase } from '../../domain/usecases/SendMonthlyReportToEmployee/ISendMonthlyReportToEmployee'

@injectable()
export class SendMonthlyReportToEmployeeController implements IController {
  constructor(
    @inject('ISendMonthlyReportToEmployeeUseCase')
    readonly sendMonthlyReportToEmployeeUseCase: ISendMonthlyReportToEmployeeUseCase
  ) { }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { employeeId } = httpRequest.params

    await this.sendMonthlyReportToEmployeeUseCase.execute({ employeeId })

    return ok({}, 'Report sent')
  }
} 