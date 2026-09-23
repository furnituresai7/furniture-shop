import rateLimit from 'express-rate-limit'

// Stricter than the general API limit: 5 enquiries per 15 minutes per IP.
// Enough for a genuine customer, tight enough to slow down spam scripts.
export const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many enquiries sent. Please try again later or contact us on WhatsApp.',
  },
})