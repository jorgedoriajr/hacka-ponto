import { container } from 'tsyringe'
import { MongoDbClient } from '../infra/database/mongo'

import { env } from './env'
import { EmployeeRepository } from '../infra/repositories/Employee'
import { ICreateEmployeeUseCase } from '../domain/usecases/CreateEmployee/ICreateEmployee'
import { CreateEmployeeUseCase } from '../domain/usecases/CreateEmployee/CreateEmployee'
import { WorkJourneyRepository } from '../infra/repositories/WorkJourney'
import { RegisterTimeEntryUseCase } from '../domain/usecases/RegisterTimeEntry/RegisterTimeEntry'
import { IRegisterTimeEntryUseCase } from '../domain/usecases/RegisterTimeEntry/IRegisterTimeEntry'
import { GetDayWorkJourneyUseCase } from '../domain/usecases/GetDayWorkJourney/GetDayWorkJourney'
import { IGetDayWorkJourneyUseCase } from '../domain/usecases/GetDayWorkJourney/IGetDayWorkJourney'
import { EmailService } from '../infra/services/EmailService'
import { SendMonthlyReportToEmployeeUseCase } from '../domain/usecases/SendMonthlyReportToEmployee/SendMonthlyReportToEmployee'
import { ISendMonthlyReportToEmployeeUseCase } from '../domain/usecases/SendMonthlyReportToEmployee/ISendMonthlyReportToEmployee'
import { ISignInEmployeeUseCase } from '../domain/usecases/SignInEmployee/ISignInEmployee'
import { SignInEmployeeUseCase } from '../domain/usecases/SignInEmployee/SignInEmployee'

export async function initializeContainer() {
  const mongoDbClientInstance = await MongoDbClient.connect(env.mongoUrl)

  container.registerInstance('MongoDbClient', mongoDbClientInstance)

  container.registerSingleton('IEmployeeRepository', EmployeeRepository)
  container.registerSingleton('IWorkJourneyRepository', WorkJourneyRepository)

  container.registerSingleton('EmailService', EmailService)

  container.register<ISendMonthlyReportToEmployeeUseCase>('ISendMonthlyReportToEmployeeUseCase', SendMonthlyReportToEmployeeUseCase)
  container.register<ISignInEmployeeUseCase>('ISignInEmployeeUseCase', SignInEmployeeUseCase)
  container.register<ICreateEmployeeUseCase>('ICreateEmployeeUseCase', CreateEmployeeUseCase)
  container.register<IRegisterTimeEntryUseCase>('IRegisterTimeEntryUseCase', RegisterTimeEntryUseCase)
  container.register<IGetDayWorkJourneyUseCase>('IGetDayWorkJourneyUseCase', GetDayWorkJourneyUseCase)
}