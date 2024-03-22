import jwt from 'jsonwebtoken'
import { env } from '../../main/env'

export class JwtAuthenticationService {
  static async verifyToken(token: string, employeeId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, env.jwtSecret, (err, decoded: any) => {
        if (err) {
          resolve(false)
        } else if (employeeId !== decoded?.id) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  static generateToken(payload: object, expiresIn: string | number = '1h'): string {
    const token = jwt.sign(payload, env.jwtSecret, { expiresIn })
    return token
  }
}