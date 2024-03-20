import { Employee } from '../../entities/Employee'

export interface IEmployeeRepository {
  create: (employee: Employee) => Promise<boolean>
  getById: (id: string) => Promise<Employee | null>
  getByEmail: (email: string) => Promise<Employee | null>
}