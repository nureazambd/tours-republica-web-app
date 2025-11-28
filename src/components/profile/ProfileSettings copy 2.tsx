"use client";

import React, { useEffect, useRef, useState } from "react";
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

  const [profileImage, setProfileImage] = useState("/images/Avatar.png");
const fileInputRef = useRef<HTMLInputElement>(null);


 return (
  <div className="flex flex-col w-[876px] bg-[#EFF2F880] shadow-sm rounded-2xl px-[44px] pt-[32px] pb-[48px] gap-[48px]">

    {/* Header */}
    <div className="flex justify-between items-center w-full h-[36px]">
      <h2 className="font-rubik text-[24px] font-medium text-[#191919]">
        Profile Settings
      </h2>

      <button
        onClick={() => setIsEditing(!isEditing)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-[16px] transition-colors ${
          isEditing
            ? "bg-[#EE2552] text-white"
            : "bg-[#EE2552] text-white hover:bg-[#EE2552]"
        }`}
      >
        <Edit3 className="w-4 h-4" />
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>
    </div>

    {/* Main container (Avatar + Form) */}
    <div className="flex flex-row gap-[52px] w-full">

      {/* Avatar Section */}
      <div className="flex flex-col items-center gap-4 w-[128px] relative">
        <div className="relative">
          <img
            src="/images/Avatar.png"
            className="w-[112px] h-[112px] rounded-full object-cover"
          />
          <span className="absolute bottom-[10px] right-[9px] w-[18px] h-[18px] bg-[#12B76A] border-4 border-white rounded-full"></span>
        </div>

        {/* Change photo */}
        {isEditing && (
          <button className="relative text-[#EE2552] text-[16px] font-medium">
            Change Photo
          </button>
        )}
      </div>

      {/* Form Section */}
      <div className="flex flex-col gap-[56px] w-[608px]">

        {/* All form fields */}
        <div className="flex flex-col gap-[32px] w-full">

          {/* Personal Info */}
          <div className="flex flex-col gap-[20px]">

            {/* Row 1 */}
            <div className="flex gap-[24px] w-full">
              {/* First Name */}
              <div className="flex flex-col gap-2 w-[294px]">
                <label className="text-[16px] font-rubik font-normal text-[#191919]">
                  Given name
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="Your given name"
                  className="w-full h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white text-[#191919] text-[14px] font-rubik"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-2 w-[294px]">
                <label className="text-[16px] font-rubik text-[#191919]">Surname</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Your surname"
                  className="w-full h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white text-[#191919] text-[14px] font-rubik"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-[24px] w-full">
              {/* Gender Dropdown */}
              <div className="flex flex-col gap-2 w-[294px]">
                <label className="text-[16px] text-[#191919]">Gender</label>
                <div className="flex items-center justify-between px-5 h-[48px] bg-white border border-[#D9D4D4CC] rounded">
                  <input
                    className="w-full outline-none text-[14px]"
                    type="text"
                    disabled={!isEditing}
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    placeholder="Select"
                  />
                </div>
              </div>

              {/* DOB */}
              <div className="flex flex-col gap-2 w-[294px]">
                <label className="text-[16px] text-[#191919]">Date of Birth</label>
                <input
                  type="date"
                  disabled={!isEditing}
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  className="w-full h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>
            </div>

          </div>

          {/* Address Section */}
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[24px] w-full">
              <div className="flex flex-col gap-2 w-[294px]">
                <label className="text-[16px]">Country</label>
                <input
                  disabled={!isEditing}
                  value={formData.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>

              <div className="flex flex-col gap-2 w-[294px]">
                <label className="text-[16px]">City</label>
                <input
                  disabled={!isEditing}
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-[16px]">Address</label>
              <input
                disabled={!isEditing}
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
              />
            </div>
          </div>

          {/* Passport Info */}
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[24px] w-full">
              <div className="flex flex-col gap-2 w-[294px]">
                <label className="text-[16px]">Passport No.</label>
                <input
                  disabled={!isEditing}
                  value={formData.passportNumber}
                  onChange={(e) => handleChange("passportNumber", e.target.value)}
                  className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>

              <div className="flex flex-col gap-2 w-[294px]">
                <label className="text-[16px]">Passport Expiry</label>
                <input
                  type="date"
                  disabled={!isEditing}
                  value={formData.passportExpiry}
                  onChange={(e) => handleChange("passportExpiry", e.target.value)}
                  className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>
            </div>

            <div className="flex gap-[24px] w-full">
              <div className="flex flex-col gap-2 w-[294px]">
                <label className="text-[16px]">Passport Country</label>
                <input
                  disabled={!isEditing}
                  value={formData.passportCountry}
                  onChange={(e) => handleChange("passportCountry", e.target.value)}
                  className="h-[48px] px-5 border border-[#D9D4DCC] rounded bg-white"
                />
              </div>

              <div className="flex flex-col gap-2 w-[294px]">
                <label className="text-[16px]">Nationality</label>
                <input
                  disabled={!isEditing}
                  value={formData.nationality}
                  onChange={(e) => handleChange("nationality", e.target.value)}
                  className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Save button */}
        {isEditing && (
          <button
            onClick={handleSave}
            className="bg-primary-500 text-white font-medium px-10 py-3 rounded-lg text-[16px] hover:bg-primary-600"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        )}

      </div>
    </div>
  </div>
);

};

export default ProfileSettings;
