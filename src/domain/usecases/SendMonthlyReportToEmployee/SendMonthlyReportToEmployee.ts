import { inject, injectable } from 'tsyringe'
import { IEmployeeRepository } from '../../ports/repositories/Employee'
import { ISendMonthlyReportToEmployeeUseCase } from './ISendMonthlyReportToEmployee'
import { MissingNecessaryDataError } from '../../errors/MissingNecessaryData'
import { SendMonthlyReportToEmployeeDTO } from './SendMonthlyReportToEmployeeDTO'
import { NotFoundError } from '../../errors/NotFoundError'
import { IWorkJourneyRepository } from '../../ports/repositories/WorkJourney'
import { EmailService } from '../../../infra/services/EmailService'
import { Employee } from '../../entities/Employee'
import { WorkJourney } from '../../entities/WorkJourney'

@injectable()
export class SendMonthlyReportToEmployeeUseCase implements ISendMonthlyReportToEmployeeUseCase {
  constructor(
    @inject('IWorkJourneyRepository')
    private readonly workJourneyRepository: IWorkJourneyRepository,
    @inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository,
    @inject('EmailService')
    private readonly emailService: EmailService
  ) { }

  async execute(params: SendMonthlyReportToEmployeeDTO): Promise<void> {
    const { employeeId } = params

    if (!employeeId) throw new MissingNecessaryDataError()

    const employee = await this.checkIfEmployeeExists(employeeId)

    const thisMonthRange = this.getThisMonthRange()

    const journeys = await this.workJourneyRepository.getByTimeRange(employeeId, thisMonthRange.startDate, thisMonthRange.endDate)

    await this.emailService.sendEmail(employee.email, 'Monthly report', this.formatEmailBody(journeys))
  }

  private async checkIfEmployeeExists(employeeId: string): Promise<Employee> {
    const found = await this.employeeRepository.getById(employeeId)

    if (!found) throw new NotFoundError()

    return found
  }

  private getThisMonthRange() {
    const now = new Date()

    const startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endDate = new Date(now.getFullYear(), now.getMonth(), 0)

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    }
  }

  private formatEmailBody(journeys: WorkJourney[]) {
    const journeysString = journeys.map(journey => {
      return `Date: ${journey.date}, Worked Time: ${(journey.workedTime / 60).toFixed(2)} hours, Time Entries: ${journey.timeEntries.length}`
    }).join('\n')

    return journeysString
  }
}