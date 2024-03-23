import { Router } from 'express'
import { container } from 'tsyringe'
import { adaptRoute } from '../../adapters/ExpressRouteAdapter'
import { CreateEmployeeController } from '../../controllers/CreateEmployeeController'
import { RegisterTimeEntryController } from '../../controllers/RegisterTimeEntryController'
import { GetDaWorkJourneyController } from '../../controllers/GetDayWorkJourney'
import { SendMonthlyReportToEmployeeController } from '../../controllers/SendMonthlyReportToEmployeeController'
import { SignInEmployeeController } from '../../controllers/SignInEmployee'
import { checkAuthentication } from '../middlewares/Authentication'

function registerEmployeeRoutes(router: Router) {
  router.post('/employees', adaptRoute(container.resolve(CreateEmployeeController)))
  router.post('/employees/:employeeId/generate-month-report', checkAuthentication, adaptRoute(container.resolve(SendMonthlyReportToEmployeeController)))
  router.post('/journey', checkAuthentication, adaptRoute(container.resolve(RegisterTimeEntryController)))
  router.get('/journey/:employeeId', checkAuthentication, adaptRoute(container.resolve(GetDaWorkJourneyController)))
  router.post('/login', adaptRoute(container.resolve(SignInEmployeeController)))

  return router
}

export { registerEmployeeRoutes }