import { Entity } from './Entity'

export class Employee extends Entity<Employee> {
  constructor(props: Partial<Employee>) {
    super(props)
  }

  public username: string

  public email: string

  public password: string

}