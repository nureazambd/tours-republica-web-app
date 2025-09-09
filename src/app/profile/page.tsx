import Layout from '@/components/layout/Layout';
import ProfileSettings from '@/components/profile/ProfileSettings';
import BookingHistory from '@/components/profile/BookingHistory';
import { User, Settings, Calendar, Heart, CreditCard, Bell } from 'lucide-react';

export default function ProfilePage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-secondary-800 to-secondary-700 text-white py-12">
          <div className="container-custom">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-white/90">Manage your account and view your booking history</p>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Content */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-primary-500 to-secondary-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">John Doe</h3>
                    <p className="text-gray-600">john.doe@example.com</p>
                    <div className="mt-3 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      ✓ Verified Account
                    </div>
                  </div>

                  <nav className="space-y-2">
                    {[
                      { icon: Settings, label: 'Account Settings', active: true },
                      { icon: Calendar, label: 'Booking History', active: false },
                      { icon: Heart, label: 'Wishlist', active: false },
                      { icon: CreditCard, label: 'Payment Methods', active: false },
                      { icon: Bell, label: 'Notifications', active: false },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={index}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                            item.active
                              ? 'bg-primary-50 text-primary-600 border border-primary-200'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>

                  <div className="mt-8 pt-6 border-t">
                    <button className="w-full text-red-600 hover:text-red-700 font-medium py-2 transition-colors duration-200">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Profile Settings */}
                <ProfileSettings />

                {/* Booking History */}
                <BookingHistory />

                {/* Account Stats */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Statistics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-blue-500" />
                      </div>
                      <div className="text-3xl font-bold text-gray-800 mb-2">5</div>
                      <div className="text-gray-600">Tours Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8 text-green-500" />
                      </div>
                      <div className="text-3xl font-bold text-gray-800 mb-2">12</div>
                      <div className="text-gray-600">Wishlist Items</div>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="w-8 h-8 text-purple-500" />
                      </div>
                      <div className="text-3xl font-bold text-gray-800 mb-2">$750</div>
                      <div className="text-gray-600">Total Spent</div>
                    </div>
                  </div>
                </div>

                {/* Loyalty Program */}
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Loyalty Program</h2>
                      <p className="text-white/90">Earn points with every booking and unlock exclusive rewards</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                      <Heart className="w-8 h-8" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-3xl font-bold mb-2">1,250 Points</div>
                      <div className="text-white/80 mb-4">Current Balance</div>
                      <div className="bg-white/20 rounded-full h-2 mb-2">
                        <div className="bg-white rounded-full h-2 w-3/4"></div>
                      </div>
                      <div className="text-sm text-white/80">750 points to Silver status</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Available Rewards</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>10% off next tour</span>
                          <span className="font-medium">500 pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Free lunch upgrade</span>
                          <span className="font-medium">300 pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Private guide</span>
                          <span className="font-medium">1,000 pts</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

