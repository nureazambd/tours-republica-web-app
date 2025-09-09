import Layout from '@/components/layout/Layout';
import BookingForm from '@/components/booking/BookingForm';
import BookingSummary from '@/components/booking/BookingSummary';

export default function BookingPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-secondary-800 to-secondary-700 text-white py-12">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Complete Your Booking
              </h1>
              <p className="text-white/90">
                Just a few more steps to secure your amazing experience
              </p>
            </div>
          </div>
        </section>

        {/* Booking Content */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Booking Form */}
              <div className="lg:col-span-2">
                <BookingForm />
              </div>

              {/* Booking Summary */}
              <div className="lg:col-span-1">
                <BookingSummary />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

