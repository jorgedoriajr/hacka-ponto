import { Employee } from './Employee'
import { Entity } from './Entity'

export class WorkJourney extends Entity<WorkJourney> {
  constructor(props: Partial<WorkJourney>) {
    super(props)

    this.timeEntries = this.timeEntries || []
  }

  public employee: Employee

  public date: string

  public workedTime: number                     // minutes

  public timeEntries: TimeEntry[]
}

export interface TimeEntry {
  timestamp: Date

  type: TimeEntryType

  number: number
}

export enum TimeEntryType {
  start = 'start',
  end = 'end',
  breakStart = 'breakStart',
  breakEnd = 'breakEnd'
}