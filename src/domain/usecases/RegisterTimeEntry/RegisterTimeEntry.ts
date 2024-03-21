import { inject, injectable } from 'tsyringe'
import { IEmployeeRepository } from '../../ports/repositories/Employee'
import { IWorkJourneyRepository } from '../../ports/repositories/WorkJourney'
import { IRegisterTimeEntryUseCase } from './IRegisterTimeEntry'
import { NotFoundError } from '../../errors/NotFoundError'
import { TimeEntry, TimeEntryType, WorkJourney } from '../../entities/WorkJourney'
import { RegisterTimeEntryDTO } from './RegisterTimeEntryDTO'
import { InvalidOperationError } from '../../errors/InvalidOperation'
import { Employee } from '../../entities/Employee'

@injectable()
export class RegisterTimeEntryUseCase implements IRegisterTimeEntryUseCase {
  constructor(
    @inject('IWorkJourneyRepository')
    private readonly registerTimeEntryRepository: IWorkJourneyRepository,
    @inject('IEmployeeRepository')
    private readonly employeeRepository: IEmployeeRepository
  ) { }

  async register(params: RegisterTimeEntryDTO): Promise<void> {
    const { employeeId, type } = params

    const today = new Date().toISOString().split('T')[0]

    await this.checkIfEmployeeExists(employeeId)

    const workJourney = await this.registerTimeEntryRepository.getByIdAndDate(employeeId, today)

    const journeyToRegister = workJourney ?? new WorkJourney({
      employee: new Employee({ id: employeeId }),
      date: today,
    })

    const workJourneyUpdated = this.updateWorkJourney(journeyToRegister, type as TimeEntryType)

    if (workJourney) {
      await this.registerTimeEntryRepository.update(workJourneyUpdated)
    } else {
      await this.registerTimeEntryRepository.create(workJourneyUpdated)
    }
  }

  private async checkIfEmployeeExists(employeeId: string) {
    const employee = await this.employeeRepository.getById(employeeId)

    if (!employee) throw new NotFoundError('Employee not found')
  }

  private updateWorkJourney(workJourney: WorkJourney, type: TimeEntryType) {
    const timeEntries = workJourney.timeEntries

    const newTimeEntry = this.formatTimeEntry(workJourney, type)

    this.validateNewEntryType(newTimeEntry.type, timeEntries)

    workJourney.timeEntries.push(newTimeEntry)

    const workedTime = this.calculateWorkedTime(timeEntries)

    workJourney.workedTime = workedTime

    return workJourney
  }

  private formatTimeEntry(workJourney: WorkJourney, type: TimeEntryType) {
    const number = workJourney.timeEntries.length + 1

    const newTimeEntry: TimeEntry = {
      number,
      timestamp: new Date(),
      type
    }

    return newTimeEntry
  }

  private validateNewEntryType(newTimeEntryType: TimeEntryType, timeEntries: TimeEntry[]) {
    if (timeEntries.length === 0 && newTimeEntryType === TimeEntryType.start) return
    else if (timeEntries.length === 0) throw new InvalidOperationError('You must start your work day first')

    const lastEntry = timeEntries[timeEntries.length - 1]

    switch (lastEntry.type) {
      case TimeEntryType.start:
        if (newTimeEntryType === TimeEntryType.start) throw new InvalidOperationError('You already started your work day')
        if (newTimeEntryType === TimeEntryType.breakEnd) throw new InvalidOperationError('You are not on a break')
        break
      case TimeEntryType.end:
        throw new InvalidOperationError('You already finished your work day')
      case TimeEntryType.breakStart:
        if (newTimeEntryType !== TimeEntryType.breakEnd) throw new InvalidOperationError('You must finish your break first')
        break
      case TimeEntryType.breakEnd:
        if (newTimeEntryType === TimeEntryType.start) throw new InvalidOperationError('You already started your work day')
        if (newTimeEntryType === TimeEntryType.breakEnd) throw new InvalidOperationError('You are not on a break')
        break
    }
  }

  private calculateWorkedTime(timeEntries: TimeEntry[]): number {
    let totalWorkedTime = 0
    let currentStartTime: Date | null = null
    let currentBreakTime = 0

    for (const entry of timeEntries) {
      switch (entry.type) {
        case TimeEntryType.start:
          currentStartTime = entry.timestamp
          break
        case TimeEntryType.end:
          if (currentStartTime) {
            totalWorkedTime += entry.timestamp.getTime() - currentStartTime.getTime() - currentBreakTime
            currentStartTime = null
            currentBreakTime = 0
          }
          break
        case TimeEntryType.breakStart:
          currentBreakTime = entry.timestamp.getTime()
          break
        case TimeEntryType.breakEnd:
          if (currentBreakTime) {
            currentBreakTime = entry.timestamp.getTime() - currentBreakTime
          }
          break
      }
    }

    // If the work day is not over yet
    if (currentStartTime) {
      totalWorkedTime += new Date().getTime() - currentStartTime.getTime() - currentBreakTime
    }

    // Convert from milliseconds to minutes
    return totalWorkedTime / 1000 / 60
  }
}
