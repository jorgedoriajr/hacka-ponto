import { inject, injectable } from 'tsyringe'
import { IEmployeeRepository } from '../../domain/ports/repositories/Employee'
import { MongoDbClient } from '../database/mongo'
import { Collection } from 'mongodb'
import { Employee } from '../../domain/entities/Employee'

@injectable()
export class EmployeeRepository implements IEmployeeRepository {
  private readonly collection: Collection

  constructor(
    @inject('MongoDbClient') protected readonly mongoDbClient: MongoDbClient
  ) {
    this.collection = this.mongoDbClient.getCollection('employees')
  }
  async create(employee: Employee): Promise<boolean> {
    const createdEmployee = await this.collection.insertOne({
      id: employee.id,
      username: employee.username,
      email: employee.email,
      password: employee.password
    })

    return createdEmployee.acknowledged
  }

  async getById(id: string): Promise<Employee | null> {
    const employee = await this.collection.findOne({ id })

    if (!employee) return null

    return new Employee({
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
      id: employee.id,
      username: employee.username,
      email: employee.email,
      password: employee.password
    })
  }

  async getByEmail(email: string): Promise<Employee | null> {
    const employee = await this.collection.findOne({ email })

    if (!employee) return null

    return new Employee({
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
      id: employee.id,
      username: employee.username,
      email: employee.email,
      password: employee.password
    })
  }
}