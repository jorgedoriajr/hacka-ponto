import { Router } from 'express'
import { container } from 'tsyringe'
import { adaptRoute } from '../../adapters/ExpressRouteAdapter'
import { CreateEmployeeController } from '../../controllers/CreateEmployeeController'
import { RegisterTimeEntryController } from '../../controllers/RegisterTimeEntryController'

function registerEmployeeRoutes(router: Router) {
  router.post('/employees', adaptRoute(container.resolve(CreateEmployeeController)))
  router.post('/journey/', adaptRoute(container.resolve(RegisterTimeEntryController)))

  return router
}

export { registerEmployeeRoutes }