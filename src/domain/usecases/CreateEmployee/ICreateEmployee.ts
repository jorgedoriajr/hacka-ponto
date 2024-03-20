import { Employee } from '../../entities/Employee'
import { CreateEmployeeDTO } from './CreateEmployeeDTO'

export interface ICreateEmployeeUseCase {
  create: (params: CreateEmployeeDTO) => Promise<Employee>
}