import { WorkJourney } from '../../entities/WorkJourney'
import { GetDayWorkJourneyDTO } from './GetDayWorkJourneyDTO'

export interface IGetDayWorkJourneyUseCase {
  get: (params: GetDayWorkJourneyDTO) => Promise<WorkJourney>
}