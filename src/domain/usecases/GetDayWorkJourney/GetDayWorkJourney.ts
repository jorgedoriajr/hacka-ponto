import { inject, injectable } from 'tsyringe'
import { IEmployeeRepository } from '../../ports/repositories/Employee'
import { IGetDayWorkJourneyUseCase } from './IGetDayWorkJourney'
import { MissingNecessaryDataError } from '../../errors/MissingNecessaryData'
import { GetDayWorkJourneyDTO } from './GetDayWorkJourneyDTO'
import { NotFoundError } from '../../errors/NotFoundError'
import { IWorkJourneyRepository } from '../../ports/repositories/WorkJourney'
import { WorkJourney } from '../../entities/WorkJourney'

@injectable()
export class GetDayWorkJourneyUseCase implements IGetDayWorkJourneyUseCase {
  constructor(
    @inject('IWorkJourneyRepository')
    private readonly workJourneyRepository: IWorkJourneyRepository,
    @inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository
  ) { }

  async get(params: GetDayWorkJourneyDTO): Promise<WorkJourney> {
    const { employeeId } = params

    if (!employeeId) throw new MissingNecessaryDataError()

    await this.checkIfEmployeeExists(employeeId)

    const journey = await this.workJourneyRepository.getByIdAndDate(employeeId, new Date().toISOString().split('T')[0])

    return journey!
  }

  private async checkIfEmployeeExists(employeeId: string) {
    const found = await this.employeeRepository.getById(employeeId)

    if (!found) throw new NotFoundError()

  }
}