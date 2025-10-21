"use client";

import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import { Eye, Shield, Clock, Users } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const benefits = [
    {
      icon: Eye,
      title: 'Track Your Bookings',
      description: 'View all your past and upcoming tours in one place'
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Your personal information is protected with industry-standard security'
    },
    {
      icon: Clock,
      title: 'Faster Checkout',
      description: 'Save your details for quick and easy future bookings'
    },
    {
      icon: Users,
      title: 'Exclusive Offers',
      description: 'Get access to member-only discounts and early bird specials'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Benefits */}
              <div className="order-2 lg:order-1">
                <div className="text-center lg:text-left mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                    Welcome Back to Tours Republica
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Sign in to your account to access exclusive features and manage your Dominican Republic adventures.
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

                <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">New to Tours Republica?</h3>
                  <p className="text-gray-600 mb-4">
                    Join thousands of travelers who have discovered the magic of the Dominican Republic with us.
                  </p>
                  <button onClick={() => router.push("/signup")} className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
                    Create Account
                  </button>
                </div>
              </div>

              {/* Right Side - Login Form */}
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="text-center mb-8">
                    <div className="bg-gradient-to-br from-primary-500 to-secondary-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h2>
                    <p className="text-gray-600">Access your Tours Republica account</p>
                  </div>

                  <LoginForm />

                  <div className="mt-8 pt-6 border-t text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{' '}
                      <button
                        onClick={() => router.push("/signup")}
                        className="text-primary-500 hover:text-primary-600 font-medium"
                      >
                        Sign up for free
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <section className="py-16 bg-white mt-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Trusted by Travelers Worldwide</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join our community of satisfied customers who have experienced the best of the Dominican Republic.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">100,000+</div>
                <div className="text-gray-600">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">4.9/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">50+</div>
                <div className="text-gray-600">Tour Options</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">7+</div>
                <div className="text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

