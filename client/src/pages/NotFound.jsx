import Button from '../components/common/Button'
import Seo from '../components/common/Seo'

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-20 text-center">
      <Seo title="Page Not Found" />

      <p className="text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 text-3xl sm:text-4xl">Page not found</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Button href="/" size="lg" className="mt-8">
        Back to Home
      </Button>
    </main>
  )
}