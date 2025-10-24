'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Save, Edit3 } from 'lucide-react';

const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    country: 'United States',
    city: 'New York',
    address: '123 Main Street',
    emergencyContact: 'Jane Doe',
    emergencyPhone: '+1 (555) 987-6543',
    preferences: {
      newsletter: true,
      smsNotifications: false,
      tourReminders: true,
      specialOffers: true
    }
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith('preferences.')) {
      const prefField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefField]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false);
    // Show success message
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            isEditing
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      <form className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={!isEditing}
                className={`input ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={!isEditing}
                className={`input ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                className={`input ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                className={`input ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                disabled={!isEditing}
                className={`input ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                disabled={!isEditing}
                className={`input ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Spain">Spain</option>
                <option value="Italy">Italy</option>
                <option value="Brazil">Brazil</option>
                <option value="Argentina">Argentina</option>
                <option value="Mexico">Mexico</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Address Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                disabled={!isEditing}
                className={`input ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
                className={`input ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Emergency Contact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Name
              </label>
              <input
                type="text"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                disabled={!isEditing}
                className={`input ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                disabled={!isEditing}
                className={`input ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Notification Preferences
          </h3>
          <div className="space-y-4">
            {[
              { key: 'newsletter', label: 'Email Newsletter', description: 'Receive our monthly newsletter with travel tips and special offers' },
              { key: 'smsNotifications', label: 'SMS Notifications', description: 'Get text messages for booking confirmations and updates' },
              { key: 'tourReminders', label: 'Tour Reminders', description: 'Receive reminders 24 hours before your scheduled tours' },
              { key: 'specialOffers', label: 'Special Offers', description: 'Be the first to know about discounts and exclusive deals' }
            ].map((pref) => (
              <label key={pref.key} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.preferences[pref.key as keyof typeof formData.preferences]}
                  onChange={(e) => handleInputChange(`preferences.${pref.key}`, e.target.checked)}
                  disabled={!isEditing}
                  className={`mt-1 w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500 ${
                    !isEditing ? 'cursor-not-allowed' : ''
                  }`}
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{pref.label}</div>
                  <div className="text-sm text-gray-600">{pref.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="border-t pt-6">
            <button
              type="button"
              onClick={handleSave}
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileSettings;

