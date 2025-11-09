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
      <div className="min-h-screen bg-gray-50 py-32">
        <div className="container-custom lg:w-[480px] h-[468px">
          <div className="max-w-md w-full mx-auto">
            <div className="text-center ml-8 w-[342px] mb-8">
              <h2 className="text-[24px] font-[500] text-gray-800 mb-1">Create Account</h2>
              <p className="text-gray-600 text-[14px] font-[400]">Enter your new password twice below to reset a new password</p>
            </div>
            <SignupForm />
            <div className="mt-8 text-center">
              <p className="text-[14px] font-[400] text-gray-600">
                Already have an account?{' '}
                {/* <button className="text-primary-500 hover:text-primary-600 font-medium">
                        Sign in here
                      </button> */}
                <button
                  onClick={() => router.push("/login")}
                  className="text-primary-500 text-[14px] font-[400] hover:text-primary-600 font-medium"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

