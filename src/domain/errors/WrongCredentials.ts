import { BusinessError, BusinessErrorType } from './BusinessError'

export class WrongCredentialsError extends BusinessError {
  constructor(message?: string) {
    super(BusinessErrorType.WrongCredentials)

    this.name = 'WrongCredentialsError'
    this.message = message ?? 'Incorrect credentials'
  }
}