import { SendMonthlyReportToEmployeeDTO } from './SendMonthlyReportToEmployeeDTO'

export interface ISendMonthlyReportToEmployeeUseCase {
  execute: (params: SendMonthlyReportToEmployeeDTO) => Promise<void>
}