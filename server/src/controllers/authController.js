import User from '../models/User.js'
import { ApiError } from '../middleware/errorHandler.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import { signToken } from '../utils/jwt.js'
import { env } from '../config/env.js'

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.nodeEnv === 'production', // HTTPS-only cookie in production
  sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required')
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() })

  // Same error for "no such user" and "wrong password".
  // Being specific here would let an attacker discover which emails exist.
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password')
  }

  const token = signToken(user._id)
  res.cookie('token', token, COOKIE_OPTIONS)

  sendSuccess(res, { data: user, message: 'Logged in' })
})

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', COOKIE_OPTIONS)
  sendSuccess(res, { message: 'Logged out' })
})

export const getMe = asyncHandler(async (req, res) => {
  sendSuccess(res, { data: req.user })
})