import { inject, injectable } from 'tsyringe'
import { MongoDbClient } from '../database/mongo'
import { Collection } from 'mongodb'
import { IWorkJourneyRepository } from '../../domain/ports/repositories/WorkJourney'
import { WorkJourney } from '../../domain/entities/WorkJourney'
import { Employee } from '../../domain/entities/Employee'

@injectable()
export class WorkJourneyRepository implements IWorkJourneyRepository {
  private readonly collection: Collection

  constructor(
    @inject('MongoDbClient') protected readonly mongoDbClient: MongoDbClient
  ) {
    this.collection = this.mongoDbClient.getCollection('workJourneys')
  }
  async create(workJourney: WorkJourney): Promise<boolean> {
    const createdJourney = await this.collection.insertOne({
      id: workJourney.id,
      createdAt: workJourney.createdAt,
      updatedAt: workJourney.updatedAt,
      date: workJourney.date,
      employeeId: workJourney.employee.id,
      timeEntries: workJourney.timeEntries,
      workedTime: workJourney.workedTime,
    })

    return createdJourney.acknowledged
  }

  async update(workJourney: WorkJourney): Promise<boolean> {
    const createdJourney = await this.collection.updateOne({ id: workJourney.id, date: workJourney.date }, {
      $set: {
        id: workJourney.id,
        createdAt: workJourney.createdAt,
        updatedAt: workJourney.updatedAt,
        date: workJourney.date,
        employeeId: workJourney.employee.id,
        timeEntries: workJourney.timeEntries,
        workedTime: workJourney.workedTime,
      }
    })

    return createdJourney.acknowledged
  }

  async getByIdAndDate(employeeId: string, date: string): Promise<WorkJourney | null> {
    const workJourney = await this.collection.findOne({ employeeId, date })

    if (!workJourney) return null

    return new WorkJourney({
      id: workJourney.id,
      createdAt: workJourney.createdAt,
      updatedAt: workJourney.updatedAt,
      date: workJourney.date,
      employee: new Employee({ id: workJourney.employeeId }),
      timeEntries: workJourney.timeEntries,
      workedTime: workJourney.workedTime,
    })
  }

  async getByTimeRange(employeeId: string, startDate: string, endDate: string): Promise<WorkJourney[]> {
    const workJourneys = await this.collection.find({ employeeId, date: { $gte: startDate, $lte: endDate } }).toArray()

    return workJourneys.map(workJourney => new WorkJourney({
      id: workJourney.id,
      createdAt: workJourney.createdAt,
      updatedAt: workJourney.updatedAt,
      date: workJourney.date,
      employee: new Employee({ id: workJourney.employeeId }),
      timeEntries: workJourney.timeEntries,
      workedTime: workJourney.workedTime,
    }))
  }
}