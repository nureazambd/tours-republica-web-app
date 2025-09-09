'use client';

import React, { useState } from 'react';
import { Calendar, MapPin, Clock, User, Mail, Phone, Car, CreditCard } from 'lucide-react';

const CarBookingForm = () => {
  const [formData, setFormData] = useState({
    // Rental Details
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: '',
    vehicleType: '',
    
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    licenseNumber: '',
    licenseCountry: '',
    
    // Additional Services
    needDriver: false,
    childSeats: 0,
    additionalDriver: false,
    airportPickup: false,
    
    // Special Requests
    specialRequests: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Booking request submitted successfully! We will contact you within 2 hours to confirm your reservation.');
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const locations = [
    'Punta Cana Airport (PUJ)',
    'Santo Domingo Airport (SDQ)',
    'Puerto Plata Airport (POP)',
    'Hotel Pickup - Punta Cana',
    'Hotel Pickup - Bavaro',
    'Hotel Pickup - Cap Cana',
    'Hotel Pickup - Santo Domingo',
    'Hotel Pickup - Puerto Plata',
    'Hotel Pickup - Samaná',
    'Custom Location'
  ];

  const vehicleTypes = [
    { value: 'economy', label: 'Economy Sedan - $35/day', popular: false },
    { value: 'compact-suv', label: 'Compact SUV - $55/day', popular: true },
    { value: 'luxury', label: 'Luxury Sedan - $85/day', popular: false },
    { value: 'full-suv', label: 'Full-Size SUV - $95/day', popular: false },
    { value: 'convertible', label: 'Convertible - $120/day', popular: false },
    { value: 'minivan', label: 'Minivan - $75/day', popular: false }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                step <= currentStep 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 ${
                  step < currentStep ? 'bg-primary-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Rental Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Rental Details</h3>
              <p className="text-gray-600">Tell us when and where you need your vehicle</p>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Car className="w-4 h-4 inline mr-1" />
                Vehicle Type *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {vehicleTypes.map((type) => (
                  <label key={type.value} className="relative cursor-pointer">
                    <input
                      type="radio"
                      name="vehicleType"
                      value={type.value}
                      checked={formData.vehicleType === type.value}
                      onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`border-2 rounded-lg p-4 transition-all duration-200 ${
                      formData.vehicleType === type.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800">{type.label}</span>
                        {type.popular && (
                          <span className="bg-primary-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Pickup and Dropoff Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <option value="">Select pickup location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Dropoff Location *
                </label>
                <select
                  value={formData.dropoffLocation}
                  onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                  className="input"
                  required
                >
                  <option value="">Select dropoff location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pickup Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Pickup Date *
                </label>
                <input
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                  className="input"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Pickup Time *
                </label>
                <select
                  value={formData.pickupTime}
                  onChange={(e) => handleInputChange('pickupTime', e.target.value)}
                  className="input"
                  required
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropoff Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Dropoff Date *
                </label>
                <input
                  type="date"
                  value={formData.dropoffDate}
                  onChange={(e) => handleInputChange('dropoffDate', e.target.value)}
                  className="input"
                  min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Dropoff Time *
                </label>
                <select
                  value={formData.dropoffTime}
                  onChange={(e) => handleInputChange('dropoffTime', e.target.value)}
                  className="input"
                  required
                >
                  <option value="">Select time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Personal Information */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Personal Information</h3>
              <p className="text-gray-600">We need your details for the rental agreement</p>
            </div>

            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
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

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            {/* Date of Birth and License */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  License Country *
                </label>
                <select
                  value={formData.licenseCountry}
                  onChange={(e) => handleInputChange('licenseCountry', e.target.value)}
                  className="input"
                  required
                >
                  <option value="">Select country</option>
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

            {/* License Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Driver's License Number *
              </label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                className="input"
                placeholder="Enter your license number"
                required
              />
            </div>
          </div>
        )}

        {/* Step 3: Additional Services */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Additional Services</h3>
              <p className="text-gray-600">Customize your rental with optional services</p>
            </div>

            {/* Additional Services */}
            <div className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.needDriver}
                  onChange={(e) => handleInputChange('needDriver', e.target.checked)}
                  className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Professional Driver (+$50/day)</div>
                  <div className="text-sm text-gray-600">Experienced local driver included</div>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.additionalDriver}
                  onChange={(e) => handleInputChange('additionalDriver', e.target.checked)}
                  className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Additional Driver (+$15/day)</div>
                  <div className="text-sm text-gray-600">Add a second authorized driver</div>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.airportPickup}
                  onChange={(e) => handleInputChange('airportPickup', e.target.checked)}
                  className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-800">Airport Pickup Service (+$25)</div>
                  <div className="text-sm text-gray-600">Meet & greet service at the airport</div>
                </div>
              </label>
            </div>

            {/* Child Seats */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Child Safety Seats (+$10/day each)
              </label>
              <select
                value={formData.childSeats}
                onChange={(e) => handleInputChange('childSeats', parseInt(e.target.value))}
                className="input"
              >
                <option value={0}>No child seats needed</option>
                <option value={1}>1 child seat</option>
                <option value={2}>2 child seats</option>
                <option value={3}>3 child seats</option>
              </select>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests or Notes
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                rows={4}
                className="input resize-none"
                placeholder="Any special requirements, pickup instructions, or additional information..."
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={prevStep}
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            disabled={currentStep === 1}
          >
            Previous
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Next Step
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-600'
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  <span>Submit Booking</span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CarBookingForm;

