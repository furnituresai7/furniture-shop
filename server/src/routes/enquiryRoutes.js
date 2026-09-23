import { Router } from 'express'
import { enquiryLimiter } from '../middleware/rateLimiters.js'
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
} from '../controllers/enquiryController.js'

const router = Router()

router.post('/', enquiryLimiter, createEnquiry)

// Admin-only routes (auth added in Step 15)
router.get('/', getEnquiries)
router.patch('/:id', updateEnquiryStatus)

export default router