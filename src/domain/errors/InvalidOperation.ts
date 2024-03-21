import { BusinessError, BusinessErrorType } from './BusinessError'

export class InvalidOperationError extends BusinessError {
  constructor(message?: string) {
    super(BusinessErrorType.InvalidOperation)

    this.name = 'InvalidOperationError'
    this.message = message ?? 'Invalid operation.'
  }
}