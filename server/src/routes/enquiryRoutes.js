import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { enquiryLimiter } from '../middleware/rateLimiters.js'
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
} from '../controllers/enquiryController.js'

const router = Router()

// Public: anyone can submit an enquiry
router.post('/', enquiryLimiter, createEnquiry)

// Admin-only: viewing and managing enquiries
router.get('/', requireAuth, getEnquiries)
router.patch('/:id', requireAuth, updateEnquiryStatus)

export default router