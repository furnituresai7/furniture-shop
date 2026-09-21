import { Eye, Heart, Target } from 'lucide-react'
import SafeImage from '../components/common/SafeImage'
import HomeCTA from '../components/home/HomeCTA'
import WhyChooseUs from '../components/home/WhyChooseUs'
import siteConfig from '../config/siteConfig'
import { aboutContent } from '../data/aboutContent'

const cardClass = 'rounded-xl border border-sand-dark bg-white p-6'

const iconClass =
  'flex h-12 w-12 items-center justify-center rounded-full bg-sand text-wood'

export default function About() {
  const {
    intro,
    image,
    imageAlt,
    story,
    experience,
    mission,
    vision,
    values,
    specialization,
    qualityCommitment,
  } = aboutContent

  return (
    <main>
      {/* Introduction */}
      <section className="bg-sand/60">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              About {siteConfig.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>

            {experience && (
              <p className="mt-6 inline-block rounded-xl bg-wood px-5 py-3 text-cream">
                <span className="font-heading text-2xl font-bold">{experience}</span>{' '}
                <span className="text-sm text-sand">of experience</span>
              </p>
            )}
          </div>

          <SafeImage
            src={image}
            alt={imageAlt}
            loading="eager"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-md"
          />
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <h2 className="text-2xl font-bold sm:text-3xl">Our Story</h2>
        <div className="mt-4 space-y-4 leading-relaxed text-muted">
          {story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Mission, vision, values */}
      <section className="bg-sand/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:py-16 md:grid-cols-3">
          <div className={cardClass}>
            <div className={iconClass}>
              <Target size={24} aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">Our Mission</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{mission}</p>
          </div>

          <div className={cardClass}>
            <div className={iconClass}>
              <Eye size={24} aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">Our Vision</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{vision}</p>
          </div>

          <div className={cardClass}>
            <div className={iconClass}>
              <Heart size={24} aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">Our Values</h2>
            <ul className="mt-2 space-y-2 text-sm text-muted">
              {values.map((value) => (
                <li key={value.title}>
                  <span className="font-medium text-ink">{value.title}:</span>{' '}
                  {value.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Specialization and quality */}
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:py-16 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Our Specialization</h2>
          <p className="mt-3 leading-relaxed text-muted">{specialization}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Our Quality Commitment</h2>
          <p className="mt-3 leading-relaxed text-muted">{qualityCommitment}</p>
        </div>
      </section>

      <WhyChooseUs />
      <HomeCTA />
    </main>
  )
}