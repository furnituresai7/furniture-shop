// Temporary page used until the real page is built
export default function PlaceholderPage({ title }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h1 className="text-3xl sm:text-4xl">{title}</h1>
      <p className="mt-3 text-muted">This page is under construction.</p>
    </main>
  )
}