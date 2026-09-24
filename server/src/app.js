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
import galleryRoutes from './routes/galleryRoutes.js'

const app = express()

app.use(helmet())

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
)

app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(mongoSanitize())

if (env.nodeEnv !== 'production') {
  app.use(morgan('dev'))
}

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
app.use('/api/gallery', galleryRoutes)

app.use(notFound)
app.use(errorHandler)

export default app