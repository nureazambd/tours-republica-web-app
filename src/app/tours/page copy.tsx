import Layout from '@/components/layout/Layout';
import TourFilter from '@/components/tours/TourFilter';
import TourGrid from '@/components/tours/TourGrid';

export default function ToursPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-secondary-800 to-secondary-700 text-white py-16">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Discover Amazing Tours
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Explore our handpicked collection of unforgettable experiences in the Dominican Republic
              </p>
            </div>
          </div>
        </section>

        {/* Tours Content */}
        <section className="py-12">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filter */}
              <div className="lg:w-1/4">
                <TourFilter />
              </div>

              {/* Tours Grid */}
              <div className="lg:w-3/4">
                <TourGrid />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

