
import Layout from '@/components/layout/Layout';
import AboutSection from '@/components/aboutus/AboutSection'
import ActivitiesSection from '@/components/aboutus/ActivitiesSection'
import GuidesSection from '@/components/aboutus/GuidesSection'
import StatsSection from '@/components/aboutus/StatsSection'
import WhySection from '@/components/aboutus/WhySection'
import React from 'react'

export default function page() {
  return (
    <div>
      <Layout>
      <AboutSection />
      <StatsSection />
      <ActivitiesSection />
      <WhySection />
      <GuidesSection />
      </Layout>
    </div>
  )
}
