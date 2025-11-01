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
      <div className=" bg-gray-50 flex items-center justify-center py-32">
        <div className="container-custom w-[480px] h-[468px]">
          <div className="max-w-md w-full mx-auto">
            <div className="">
              {/* Header */}
              <div className="text-center mb-8">
                
                <h2 className="text-[24px] font-[500] text-gray-800 mb-1">Login</h2>
                <p className="text-gray-600 text-[14px] font-[400]">Access your Tours Republica account</p>
              </div>

              {/* Login Form */}
              <LoginForm />

              {/* Footer */}
              <div className="mt-[32px] text-center">
                <p className="text-[14px] font-[400] text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => router.push("/signup")}
                    className="text-primary-500 text-[14px] font-[400] hover:text-primary-600 font-medium"
                  >
                    Create here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
}

