import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../../../main/env'

export class JwtMiddleware {
  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']

    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' })

    jwt.verify(token, env.jwtSecret, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })

      next()
    })
  }

  static generateToken(payload: object, expiresIn: string | number = '1h'): string {
    const token = jwt.sign(payload, env.jwtSecret, { expiresIn })
    return token
  }
}