import { Router } from 'express'
import { container } from 'tsyringe'
import { adaptRoute } from '../../adapters/ExpressRouteAdapter'
import { CreateEmployeeController } from '../../controllers/CreateEmployeeController'

function registerEmployeeRoutes(router: Router) {
  router.post('/employees', adaptRoute(container.resolve(CreateEmployeeController)))

  return router
}

export { registerEmployeeRoutes }