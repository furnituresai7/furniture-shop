import ContactDetails from '../components/contact/ContactDetails'
import EnquiryForm from '../components/contact/EnquiryForm'
import LocationMap from '../components/contact/LocationMap'
import Seo from '../components/common/Seo'

export default function Contact() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <Seo
        title="Contact Us"
        description="Get in touch with us for enquiries, custom orders or any other information."
      />

      <header className="text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Get in Touch</h1>
        <p className="mx-auto mt-2 max-w-xl text-muted">
          We would love to hear from you. Reach out for enquiries, custom orders
          or any other information.
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ContactDetails />

        <section aria-labelledby="enquiry-heading">
          <h2 id="enquiry-heading" className="mb-4 text-2xl font-bold">
            Send an Enquiry
          </h2>
          <EnquiryForm />
        </section>
      </div>

      <LocationMap />
    </main>
  )
}