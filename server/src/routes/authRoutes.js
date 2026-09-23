import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { requireAuth } from '../middleware/auth.js'
import { getMe, login, logout } from '../controllers/authController.js'

const router = Router()

// Strict limit on login attempts: 10 per 15 minutes per IP, to slow down
// password-guessing attacks without locking out a genuine user who mistypes.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
})

router.post('/login', loginLimiter, login)
router.post('/logout', logout)
router.get('/me', requireAuth, getMe)

export default router