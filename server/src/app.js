import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import { env } from './config/env.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import healthRoutes from './routes/healthRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import enquiryRoutes from './routes/enquiryRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

// Security headers
app.use(helmet())

// Only allow requests from our frontend, and allow cookies to be sent
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
)

// Parse JSON request bodies and cookies
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

// Strip MongoDB-operator characters from user input (basic injection protection)
app.use(mongoSanitize())

// Log requests while developing
if (env.nodeEnv !== 'production') {
  app.use(morgan('dev'))
}

// General rate limit: 300 requests per 15 minutes per IP.
// Login and enquiry routes have their own, stricter limits.
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: true,
    legacyHeaders: false,
  }),
)

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/enquiries', enquiryRoutes)

app.use(notFound)
app.use(errorHandler)

export default app