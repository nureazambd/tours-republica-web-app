"use client";

import React, { useEffect, useRef, useState } from "react";
import { Save, Edit3 } from "lucide-react";
import toast from "react-hot-toast";

const defaultForm = {
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
};

const ProfileSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultForm);
  const [profileImage, setProfileImage] = useState("/images/Avatar.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Load user data (ONLY ONE FETCH — FIXES YOUR ISSUE)
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok && data.user) {
        setFormData({
          ...defaultForm,
          ...data.user, // merge safely – prevents undefined
        });

        setProfileImage(data.user.profileImage || "/images/Avatar.png");
        localStorage.setItem("userInfo", JSON.stringify(data.user));
      } else {
        toast.error(data.error || "Failed to load user info");
      }
    };

    fetchUser();
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value ?? "", // prevent undefined
    }));
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
    <div className="flex flex-col w-[876px] bg-[#EFF2F880] shadow-sm rounded-2xl px-[44px] pt-[32px] pb-[48px] gap-[48px]">

      {/* Header */}
      <div className="flex justify-between items-center w-full h-[36px]">
        <h2 className="font-rubik text-[24px] font-medium text-[#191919]">
          Profile Settings
        </h2>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-[16px] transition-colors
            bg-[#EE2552] text-white`}
        >
          <Edit3 className="w-4 h-4" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Main container */}
      <div className="flex flex-row gap-[52px] w-full">

        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4 w-[128px] relative">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-[112px] h-[112px] rounded-full object-cover"
            />
            <span className="absolute bottom-[10px] right-[9px] w-[18px] h-[18px] bg-[#12B76A] border-4 border-white rounded-full"></span>
          </div>

          {/* Hidden Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const preview = URL.createObjectURL(file);
              setProfileImage(preview);

              const token = localStorage.getItem("token");
              if (!token) return toast.error("Not logged in");

              const formDataImg = new FormData();
              formDataImg.append("profileImage", file);

              const res = await fetch("/api/user/upload-profile-photo", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formDataImg,
              });

              const data = await res.json();
              if (res.ok) {
                setProfileImage(data.imageUrl);
                toast.success("Photo updated!");
              } else {
                toast.error(data.error || "Upload failed");
              }
            }}
          />

          {isEditing && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-[#EE2552] text-[16px] font-medium"
            >
              Change Photo
            </button>
          )}
        </div>

        {/* Form Section */}
        <div className="flex flex-col gap-[56px] w-[608px]">

          <div className="flex flex-col gap-[32px]">

            {/* Row 1 */}
            <div className="flex gap-[24px] w-full">
              <div className="flex flex-col w-[294px] gap-2">
                <label>Given name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.firstName ?? ""}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>

              <div className="flex flex-col w-[294px] gap-2">
                <label>Surname</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.lastName ?? ""}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex gap-[24px]">

              {/* Gender */}
              <div className="flex flex-col w-[294px] gap-2">
                <label>Gender</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.gender ?? ""}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  placeholder="Select"
                  className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>

              {/* DOB */}
              <div className="flex flex-col w-[294px] gap-2">
                <label>Date of Birth</label>
                <input
                  type="date"
                  disabled={!isEditing}
                  value={formData.dateOfBirth ?? ""}
                  onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                  className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex gap-[24px]">
              <div className="flex flex-col w-[294px] gap-2">
                <label>Country</label>
                <input
                  disabled={!isEditing}
                  value={formData.country ?? ""}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>

              <div className="flex flex-col w-[294px] gap-2">
                <label>City</label>
                <input
                  disabled={!isEditing}
                  value={formData.city ?? ""}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label>Address</label>
              <input
                disabled={!isEditing}
                value={formData.address ?? ""}
                onChange={(e) => handleChange("address", e.target.value)}
                className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
              />
            </div>

            {/* Passport Info */}
            <div className="flex gap-[24px]">
              <div className="flex flex-col w-[294px] gap-2">
                <label>Passport No.</label>
                <input
                  disabled={!isEditing}
                  value={formData.passportNumber ?? ""}
                  onChange={(e) => handleChange("passportNumber", e.target.value)}
                  className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>

              <div className="flex flex-col w-[294px] gap-2">
                <label>Passport Expiry</label>
                <input
                  type="date"
                  disabled={!isEditing}
                  value={formData.passportExpiry ?? ""}
                  onChange={(e) => handleChange("passportExpiry", e.target.value)}
                  className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>
            </div>

            <div className="flex gap-[24px]">
              <div className="flex flex-col w-[294px] gap-2">
                <label>Passport Country</label>
                <input
                  disabled={!isEditing}
                  value={formData.passportCountry ?? ""}
                  onChange={(e) => handleChange("passportCountry", e.target.value)}
                  className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>

              <div className="flex flex-col w-[294px] gap-2">
                <label>Nationality</label>
                <input
                  disabled={!isEditing}
                  value={formData.nationality ?? ""}
                  onChange={(e) => handleChange("nationality", e.target.value)}
                  className="h-[48px] px-5 border border-[#D9D4D4CC] rounded bg-white"
                />
              </div>
            </div>
          </div>

          {isEditing && (
            <button
              onClick={handleSave}
              className="bg-primary-500 text-white px-10 py-3 rounded-lg hover:bg-primary-600"
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
