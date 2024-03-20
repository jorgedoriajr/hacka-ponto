import { container } from 'tsyringe'
import { MongoDbClient } from '../infra/database/mongo'

import { env } from './env'
import { EmployeeRepository } from '../infra/repositories/Employee'
import { ICreateEmployeeUseCase } from '../domain/usecases/CreateEmployee/ICreateEmployee'
import { CreateEmployeeUseCase } from '../domain/usecases/CreateEmployee/CreateEmployee'

export async function initializeContainer() {
  const mongoDbClientInstance = await MongoDbClient.connect(env.mongoUrl)

  container.registerInstance('MongoDbClient', mongoDbClientInstance)

  container.registerSingleton('IEmployeeRepository', EmployeeRepository)

  container.register<ICreateEmployeeUseCase>('ICreateEmployeeUseCase', CreateEmployeeUseCase)
}