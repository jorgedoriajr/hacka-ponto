import { BusinessError, BusinessErrorType } from './BusinessError'

export class EmployeeAlreadyExistsError extends BusinessError {
  constructor(message?: string) {
    super(BusinessErrorType.AlreadyExists)

    this.name = 'EmployeeAlreadyExistsError'
    this.message = message ?? 'Employee already exists.'
  }
}