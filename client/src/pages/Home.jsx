import CategoryGrid from '../components/home/CategoryGrid'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Hero from '../components/home/Hero'
import HomeCTA from '../components/home/HomeCTA'
import StatsBar from '../components/home/StatsBar'
import WhyChooseUs from '../components/home/WhyChooseUs'
import { demoCategories, demoProducts } from '../data/demoData'

export default function Home() {
  const featuredProducts = demoProducts
    .filter((product) => product.featured)
    .slice(0, 4)

  return (
    <main>
      <Hero />
      <StatsBar />
      <CategoryGrid categories={demoCategories} />
      <FeaturedProducts products={featuredProducts} />
      <WhyChooseUs />
      <HomeCTA />
    </main>
  )
}