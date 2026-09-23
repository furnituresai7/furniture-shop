import User from '../models/User.js'
import { ApiError } from './errorHandler.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { verifyToken } from '../utils/jwt.js'

// Reads the JWT from the httpOnly cookie, verifies it, and attaches the
// logged-in user to req.user. Use on any route that requires an admin.
export const requireAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token

  if (!token) throw new ApiError(401, 'Not logged in')

  let payload
  try {
    payload = verifyToken(token)
  } catch {
    throw new ApiError(401, 'Session expired, please log in again')
  }

  const user = await User.findById(payload.userId)
  if (!user) throw new ApiError(401, 'Account no longer exists')

  req.user = user
  next()
})