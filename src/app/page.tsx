import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import PopularDestinations from '@/components/home/PopularDestinations';
import FeaturedTours from '@/components/home/FeaturedTours';
import TransportSection from '@/components/home/TransportSection';
import TravelStyle from '@/components/home/TravelStyle';
import Testimonials from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <PopularDestinations />
      <FeaturedTours />
      <TransportSection />
      <TravelStyle />
      <Testimonials />
    </Layout>
  );
}

