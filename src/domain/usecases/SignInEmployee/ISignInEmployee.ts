import { SignInEmployeeDTO } from './SignInEmployeeDTO'

export interface ISignInEmployeeUseCase {
  get: (params: SignInEmployeeDTO) => Promise<{ token: string }>
}