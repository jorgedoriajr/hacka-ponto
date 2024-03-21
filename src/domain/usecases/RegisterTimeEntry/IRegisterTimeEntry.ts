import { RegisterTimeEntryDTO } from './RegisterTimeEntryDTO'

export interface IRegisterTimeEntryUseCase {
  register: (params: RegisterTimeEntryDTO) => Promise<void>
}