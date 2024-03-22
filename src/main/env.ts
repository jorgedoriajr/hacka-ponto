export const env = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'secret',
  emailServiceHost: process.env.EMAIL_SERVICE_HOST || '',
  emailServicePort: process.env.EMAIL_SERVICE_PORT || '',
  emailServiceUser: process.env.EMAIL_SERVICE_USER || '',
  emailServicePassword: process.env.EMAIL_SERVICE_PASSWORD || ''
}