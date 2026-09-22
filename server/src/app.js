import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import { env } from './config/env.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import healthRoutes from './routes/healthRoutes.js'

const app = express()

// Security headers
app.use(helmet())

// Only allow requests from our frontend
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
)

// Parse JSON request bodies
app.use(express.json({ limit: '1mb' }))

// Strip MongoDB-operator characters from user input (basic injection protection)
app.use(mongoSanitize())

// Log requests while developing
if (env.nodeEnv !== 'production') {
  app.use(morgan('dev'))
}

// General rate limit: 300 requests per 15 minutes per IP.
// Stricter limits will be added later for the enquiry form and admin login.
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
  }),
)

app.use('/api/health', healthRoutes)

// More route groups (products, categories, enquiries, auth) will be added here
// in the following steps.

app.use(notFound)
app.use(errorHandler)

export default app