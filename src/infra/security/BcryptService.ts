import bcrypt from 'bcrypt'

class BcryptService {
  private static readonly saltRounds = 10

  static async encryptPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, BcryptService.saltRounds)
    return hashedPassword
  }

  static async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword)
    return isPasswordValid
  }
}

export default BcryptService