import { Request, Response, NextFunction } from 'express'
import { JwtAuthenticationService } from '../../../infra/security/JwtAuthenticationService'
export function checkAuthentication(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  JwtAuthenticationService.verifyToken(authorization, req.params.employeeId)
    .then((isAuthenticated) => {
      if (!isAuthenticated) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      next()
    })
}