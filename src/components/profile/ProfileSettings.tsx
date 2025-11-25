"use client";

import React, { useEffect, useState } from "react";
import {
  Save,
  Edit3,
  User,
  MapPin,
  CreditCard,
} from "lucide-react";
import toast from "react-hot-toast";

const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    passportNumber: "",
    passportExpiry: "",
    passportCountry: "",
    nationality: "",
  });

  // ✅ Load user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok && data.user) {
        setFormData(data.user);
        localStorage.setItem("userInfo", JSON.stringify(data.user));
      } else {
        toast.error(data.error || "Failed to load user info");
      }
    };

    fetchUser();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Save updates
  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in");
        return;
      }

      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");

      localStorage.setItem("userInfo", JSON.stringify(data.user));
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#EFF2F880] rounded-2xl shadow p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            isEditing
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-primary-500 text-white hover:bg-primary-600"
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
        </button>
      </div>

      <form className="space-y-6">
        {/* Personal Info */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" /> Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "First Name", field: "firstName" },
              { label: "Last Name", field: "lastName" },
              { label: "Email", field: "email", disabled: true },
              { label: "Phone", field: "phone" },
              { label: "Gender", field: "gender" },
              { label: "Date of Birth", field: "dateOfBirth", type: "date" },
            ].map((input) => (
              <div key={input.field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{input.label}</label>
                <input
                  type={input.type || "text"}
                  value={formData[input.field as keyof typeof formData] || ""}
                  disabled={!isEditing || input.disabled}
                  onChange={(e) => handleChange(input.field, e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Address Info */}
        <section className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" /> Address Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Country", field: "country" },
              { label: "City", field: "city" },
              { label: "Address", field: "address" },
            ].map((input) => (
              <div key={input.field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{input.label}</label>
                <input
                  type="text"
                  value={formData[input.field as keyof typeof formData] || ""}
                  disabled={!isEditing}
                  onChange={(e) => handleChange(input.field, e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Passport Info */}
        <section className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" /> Passport Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Passport No.", field: "passportNumber" },
              { label: "Passport Expiry Date", field: "passportExpiry", type: "date" },
              { label: "Passport Country", field: "passportCountry" },
              { label: "Nationality", field: "nationality" },
            ].map((input) => (
              <div key={input.field}>
                <label className="block text-sm font-medium text-gray-700 mb-2">{input.label}</label>
                <input
                  type={input.type || "text"}
                  value={formData[input.field as keyof typeof formData] || ""}
                  disabled={!isEditing}
                  onChange={(e) => handleChange(input.field, e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 ${
                    !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Save Button */}
        {isEditing && (
          <div className="border-t pt-6">
            <button
              type="button"
              disabled={loading}
              onClick={handleSave}
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileSettings;
