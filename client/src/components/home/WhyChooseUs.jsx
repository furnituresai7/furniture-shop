import { homeContent } from '../../data/homeContent'
import SectionHeading from '../common/SectionHeading'

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <SectionHeading
        title="Why Choose Us"
        subtitle="What you can expect when you shop with us."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {homeContent.whyChooseUs.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.title}
              className="rounded-xl border border-sand-dark bg-white p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand text-wood">
                <Icon size={24} aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.text}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}