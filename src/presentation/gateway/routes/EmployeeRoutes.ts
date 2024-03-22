import { Router } from 'express'
import { container } from 'tsyringe'
import { adaptRoute } from '../../adapters/ExpressRouteAdapter'
import { CreateEmployeeController } from '../../controllers/CreateEmployeeController'
import { RegisterTimeEntryController } from '../../controllers/RegisterTimeEntryController'
import { GetDaWorkJourneyController } from '../../controllers/GetDayWorkJourney'
import { SendMonthlyReportToEmployeeController } from '../../controllers/SendMonthlyReportToEmployeeController'

function registerEmployeeRoutes(router: Router) {
  router.post('/employees', adaptRoute(container.resolve(CreateEmployeeController)))
  router.post('/employees/:employeeId/generate-month-report', adaptRoute(container.resolve(SendMonthlyReportToEmployeeController)))
  router.post('/journey', adaptRoute(container.resolve(RegisterTimeEntryController)))
  router.get('/journey/:employeeId', adaptRoute(container.resolve(GetDaWorkJourneyController)))

  return router
}

export { registerEmployeeRoutes }