import Layout from '@/components/layout/Layout';
import ContactForm from '@/components/contact/ContactForm';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Call us on',
      details: ['+1 (829) 618 5692'],
      description: 'Available 24/7 for emergencies'
    },
    {
      icon: MessageCircle,
      title: 'Book On Whatsapp',
      details: ['+1 (829) 618 5692'],
      description: 'Quick booking and instant responses'
    },
    {
      icon: Mail,
      title: 'Mail us on',
      details: ['reservas@toursrepublica.com'],
      description: 'We respond within 2 hours'
    },
    {
      icon: MapPin,
      title: 'Visit our office',
      details: ['Local 14-B, Plaza Roque Bávaro', '23301, Dominican Republic'],
      description: 'Open Monday to Sunday'
    }
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 8:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Sunday', hours: '10:00 AM - 4:00 PM' },
  ];

  const faqs = [
    {
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 24-48 hours in advance, especially during peak season (December-April). However, we often have same-day availability.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Free cancellation up to 24 hours before your tour. For cancellations within 24 hours, a 50% fee applies. No-shows are non-refundable.'
    },
    {
      question: 'Do you provide hotel pickup?',
      answer: 'Yes! We provide complimentary pickup from most hotels in Punta Cana, Bavaro, and surrounding areas. Pickup times are confirmed 24 hours before your tour.'
    },
    {
      question: 'What should I bring on tours?',
      answer: 'Comfortable clothes, sunscreen, hat, camera, and cash for souvenirs. Specific items vary by tour - we\'ll send you a detailed packing list after booking.'
    },
    {
      question: 'Are your tours suitable for children?',
      answer: 'Most of our tours are family-friendly! Age restrictions vary by activity. Children under 3 are usually free, and we offer discounts for kids 3-12.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash (USD, EUR, DOP), PayPal, and major credit cards. You can pay online when booking or in cash on the day of your tour.'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-secondary-800 to-secondary-700 text-white py-16">
          <div className="container-custom">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Get in Touch
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Have questions about our tours? Need help planning your Dominican Republic adventure? 
                We're here to help make your experience unforgettable.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{info.title}</h3>
                    <div className="space-y-1 mb-2">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-800 font-medium">{detail}</p>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{info.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form and Map */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                <ContactForm />
              </div>

              {/* Map and Office Hours */}
              <div className="space-y-8">
                {/* Map Placeholder */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Find Our Office</h3>
                  <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl h-64 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                      <p className="text-gray-700 font-medium">Interactive Map</p>
                      <p className="text-sm text-gray-600">Plaza Roque Bávaro, Punta Cana</p>
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-2" />
                    Office Hours
                  </h3>
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="space-y-4">
                      {officeHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <span className="font-medium text-gray-800">{schedule.day}</span>
                          <span className="text-primary-500 font-semibold">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Emergency Support:</strong> Available 24/7 for guests on active tours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find quick answers to common questions about our tours and services.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-16 bg-red-50 border-t border-red-100">
          <div className="container-custom">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Emergency Contact</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                If you're currently on a tour and need immediate assistance, please call our emergency hotline.
              </p>
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
                <p className="text-2xl font-bold text-red-500 mb-2">+1 (829) 618 5692</p>
                <p className="text-sm text-gray-600">Available 24/7 for tour emergencies</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Book Your Adventure?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Don't wait! Book your Dominican Republic experience today and create memories that will last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                Browse Tours
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-primary-500 font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
                WhatsApp Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

