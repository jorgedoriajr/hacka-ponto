import { WorkJourney } from '../../entities/WorkJourney'

export interface IWorkJourneyRepository {
  create: (workJourney: WorkJourney) => Promise<boolean>
  update: (workJourney: WorkJourney) => Promise<boolean>
  getByIdAndDate: (employeeId: string, date: string) => Promise<WorkJourney | null>
}