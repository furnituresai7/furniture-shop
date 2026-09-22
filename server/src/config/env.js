import dotenv from 'dotenv'

dotenv.config()

// Central place that reads and validates environment variables.
// Import this instead of using process.env directly elsewhere.
const requiredInProduction = ['MONGO_URI', 'JWT_SECRET', 'CLIENT_URL']

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  },
}

export function assertRequiredEnv() {
  if (env.nodeEnv !== 'production') return

  const missing = requiredInProduction.filter((key) => {
    const value = key === 'MONGO_URI' ? env.mongoUri
      : key === 'JWT_SECRET' ? env.jwtSecret
      : env.clientUrl
    return !value
  })

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}