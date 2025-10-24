'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Save, Edit3 } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>(null);

  // ✅ Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setFormData(data.user);
        } else {
          toast.error(data.error || 'Failed to load user data');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error fetching profile');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith('preferences.')) {
      const prefField = field.split('.')[1];
      setFormData((prev: any) => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefField]: value,
        },
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      } else {
        toast.error(data.error || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!formData) return <p>No user data found</p>;

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
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" /> Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['firstName', 'lastName', 'email', 'phone', 'country'].map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {key}
                </label>
                <input
                  type={key === 'email' ? 'email' : 'text'}
                  value={formData[key] || ''}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  disabled={key === 'email' || !isEditing}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    !isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" /> Address Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['city', 'address'].map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {key}
                </label>
                <input
                  type="text"
                  value={formData[key] || ''}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md ${
                    !isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

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
