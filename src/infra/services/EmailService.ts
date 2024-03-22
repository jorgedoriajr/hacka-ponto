import { injectable } from 'tsyringe'
import { Transporter, createTransport } from 'nodemailer'
import { env } from '../../main/env'

injectable()
export class EmailService {
  private transporter: Transporter

  constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: env.emailServiceUser,
        pass: env.emailServicePassword
      },
    })
  }

  async sendEmail(to: string, subject: string, message: string) {
    try {
      await this.transporter.sendMail({ from: env.emailServiceUser, to, subject, text: message })

    } catch (error) {
      console.error(error)
    }
  }
}