'use client';

import React, { useState } from 'react';
import { User, MapPin, CreditCard, Calendar, Users, Phone, Mail, Globe } from 'lucide-react';

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Traveler Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    
    // Pickup Information
    pickupLocation: '',
    remarks: '',
    
    // Booking Details
    date: '',
    duration: 'full-day',
    adults: 2,
    children: 0,
    infants: 0,
    
    // Payment Details
    paymentMethod: 'cash',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const steps = [
    { id: 1, title: 'Traveler Information', icon: User },
    { id: 2, title: 'Pickup Information', icon: MapPin },
    { id: 3, title: 'Booking Details', icon: Calendar },
    { id: 4, title: 'Payment Details', icon: CreditCard }
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Booking submitted:', formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-200 ${
                  isActive 
                    ? 'bg-primary-500 border-primary-500 text-white' 
                    : isCompleted 
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 text-gray-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {steps[currentStep - 1].title}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Traveler Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="input"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Country *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="input"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="ES">Spain</option>
                  <option value="IT">Italy</option>
                  <option value="BR">Brazil</option>
                  <option value="AR">Argentina</option>
                  <option value="MX">Mexico</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Pickup Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Pickup Location *
              </label>
              <select
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                className="input"
                required
              >
                <option value="">Select Pickup Location</option>
                <option value="hotel-pickup">Hotel Pickup (Punta Cana)</option>
                <option value="airport">Punta Cana Airport</option>
                <option value="bavaro">Bavaro Beach</option>
                <option value="cap-cana">Cap Cana</option>
                <option value="uvero-alto">Uvero Alto</option>
                <option value="other">Other (specify in remarks)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Remarks or Instructions
              </label>
              <textarea
                value={formData.remarks}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
                rows={4}
                className="input resize-none"
                placeholder="Any special requests, dietary restrictions, or additional information..."
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Pickup Information</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Hotel pickup is available for most Punta Cana hotels</li>
                <li>• Pickup time will be confirmed 24 hours before your tour</li>
                <li>• Please be ready 10 minutes before scheduled pickup time</li>
                <li>• Contact us if your hotel is not listed</li>
              </ul>
            </div>
          </div>
        )}

        {/* Step 3: Booking Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Tour Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="input"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="input"
                >
                  <option value="full-day">Full Day (8-10 hours)</option>
                  <option value="half-day">Half Day (4-6 hours)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                <Users className="w-4 h-4 inline mr-1" />
                Number of Travelers
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Adults (18+)</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      type="button"
                      onClick={() => handleInputChange('adults', Math.max(1, formData.adults - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-center flex-1">{formData.adults}</span>
                    <button
                      type="button"
                      onClick={() => handleInputChange('adults', formData.adults + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Children (3-17)</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      type="button"
                      onClick={() => handleInputChange('children', Math.max(0, formData.children - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-center flex-1">{formData.children}</span>
                    <button
                      type="button"
                      onClick={() => handleInputChange('children', formData.children + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">Infants (0-2)</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      type="button"
                      onClick={() => handleInputChange('infants', Math.max(0, formData.infants - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-center flex-1">{formData.infants}</span>
                    <button
                      type="button"
                      onClick={() => handleInputChange('infants', formData.infants + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Payment Details */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Payment Method *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'cash', name: 'Cash on Tour', icon: '💵' },
                  { id: 'paypal', name: 'PayPal', icon: '🅿️' },
                  { id: 'card', name: 'Credit Card', icon: '💳' }
                ].map((method) => (
                  <label key={method.id} className="cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`border-2 rounded-lg p-4 text-center transition-colors duration-200 ${
                      formData.paymentMethod === method.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <div className="text-2xl mb-2">{method.icon}</div>
                      <div className="font-medium text-gray-800">{method.name}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="space-y-4 border-t pt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="input"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      className="input"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      className="input"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.paymentMethod === 'cash' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Cash Payment</h4>
                <p className="text-sm text-green-700">
                  You can pay in cash on the day of your tour. Our guide will collect payment before the tour begins. 
                  We accept USD, EUR, and Dominican Pesos.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8 border-t">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Complete Booking
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;

