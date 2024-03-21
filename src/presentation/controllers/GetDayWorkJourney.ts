import { inject, injectable } from 'tsyringe'
import { IController } from '../interfaces/IController'
import { IHttpRequest } from '../interfaces/IHttpRequest'
import { ok } from '../adapters/HttpResponseAdapter'
import { IHttpResponse } from '../interfaces/IHttpResponse'
import { IGetDayWorkJourneyUseCase } from '../../domain/usecases/GetDayWorkJourney/IGetDayWorkJourney'

@injectable()
export class GetDaWorkJourneyController implements IController {
  constructor(
    @inject('IGetDayWorkJourneyUseCase')
    readonly getDayWorkJourneyUseCase: IGetDayWorkJourneyUseCase
  ) { }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { employeeId } = httpRequest.params

    const result = await this.getDayWorkJourneyUseCase.get({ employeeId })

    return ok(result, 'Work journey retrieved successfully')
  }
} 