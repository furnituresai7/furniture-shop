import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { submitEnquiry } from '../../services/enquiryService'
import { normalizePhone, validateEnquiry } from '../../utils/validateEnquiry'
import Button from '../common/Button'
import TextField from '../common/TextField'

// "website" is the honeypot field: real visitors never see or fill it
const EMPTY_FORM = { name: '', phone: '', email: '', message: '', website: '' }

const FIELD_ORDER = ['name', 'phone', 'email', 'message']

export default function EnquiryForm() {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (event) => {
    const { name, value } = event.target

    setValues((current) => ({ ...current, [name]: value }))

    // Clear a field's error as soon as the visitor edits it
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (status === 'submitting') return

    const validationErrors = validateEnquiry(values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      // Move focus to the first field with a problem
      const firstInvalid = FIELD_ORDER.find((field) => validationErrors[field])
      document.getElementById(`enquiry-${firstInvalid}`)?.focus()
      return
    }

    // A filled honeypot means a bot. Pretend it worked and send nothing.
    if (values.website) {
      setStatus('success')
      return
    }

    setStatus('submitting')

    try {
      await submitEnquiry({
        name: values.name.trim(),
        phone: normalizePhone(values.phone),
        email: values.email.trim(),
        message: values.message.trim(),
      })

      setValues(EMPTY_FORM)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-xl border border-sand-dark bg-white p-8 text-center"
      >
        <CheckCircle size={40} className="mx-auto text-whatsapp" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold">Thank you!</h3>
        <p className="mt-2 text-muted">
          Your enquiry has been received. We will get back to you soon.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus('idle')}>
          Send another enquiry
        </Button>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="relative space-y-4 rounded-xl border border-sand-dark bg-white p-6"
    >
      <TextField
        id="enquiry-name"
        name="name"
        label="Your name"
        required
        autoComplete="name"
        placeholder="Enter your name"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
      />

      <TextField
        id="enquiry-phone"
        name="phone"
        label="Phone number"
        required
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="10-digit mobile number"
        value={values.phone}
        onChange={handleChange}
        error={errors.phone}
      />

      <TextField
        id="enquiry-email"
        name="email"
        label="Email (optional)"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
      />

      <TextField
        id="enquiry-message"
        name="message"
        label="Message"
        required
        multiline
        rows={5}
        placeholder="Tell us what you are looking for"
        value={values.message}
        onChange={handleChange}
        error={errors.message}
      />

      {/* Honeypot: hidden from people and screen readers, tempting for bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="enquiry-website">Website</label>
        <input
          id="enquiry-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      {status === 'error' && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-danger"
        >
          Something went wrong while sending your enquiry. Please try again, or
          contact us on WhatsApp.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Enquiry'}
      </Button>
    </form>
  )
}