"use client";

import Layout from '@/components/layout/Layout';
import SignupForm from '@/components/auth/SignupForm';
import { Gift, Star, Shield, Clock } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const benefits = [
    {
      icon: Gift,
      title: 'Welcome Bonus',
      description: 'Get 10% off your first booking when you create an account'
    },
    {
      icon: Star,
      title: 'Exclusive Access',
      description: 'Be the first to know about new tours and special promotions'
    },
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Your personal and payment information is always protected'
    },
    {
      icon: Clock,
      title: 'Quick Checkout',
      description: 'Save time on future bookings with stored preferences'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Signup Form */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="text-center mb-8">
                    <div className="bg-gradient-to-br from-primary-500 to-secondary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Gift className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
                    <p className="text-gray-600">Join Tours Republica and start your adventure</p>
                  </div>

                  <SignupForm />

                  <div className="mt-8 pt-6 border-t text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      {/* <button className="text-primary-500 hover:text-primary-600 font-medium">
                        Sign in here
                      </button> */}
                      <button
      onClick={() => router.push("/login")}
      className="text-primary-500 hover:text-primary-600 font-medium"
    >
       Sign in here
    </button>
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Benefits */}
              <div className="order-1 lg:order-2">
                <div className="text-center lg:text-left mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    Start Your Dominican Republic Adventure
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Create your free account and unlock exclusive benefits, personalized recommendations, and seamless booking experiences.
                  </p>
                </div>

                <div className="space-y-6">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">🎉 Limited Time Offer</h3>
                  <p className="text-gray-600 mb-4">
                    Sign up today and get <strong>10% off</strong> your first tour booking. Plus, earn loyalty points with every adventure!
                  </p>
                  <div className="text-sm text-gray-500">
                    * Offer valid for new customers only. Terms and conditions apply.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <section className="py-16 bg-white mt-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Join Our Growing Community</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Thousands of travelers have already discovered the magic of the Dominican Republic with Tours Republica.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Excellent Reviews</h3>
                <p className="text-gray-600">4.9/5 stars from over 1,200 verified reviews</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Safe & Secure</h3>
                <p className="text-gray-600">Your data is protected with bank-level security</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Member Benefits</h3>
                <p className="text-gray-600">Exclusive discounts and early access to new tours</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">100,000+</div>
                <div className="text-gray-600">Happy Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">50+</div>
                <div className="text-gray-600">Tour Options</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">7+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">24/7</div>
                <div className="text-gray-600">Customer Support</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

