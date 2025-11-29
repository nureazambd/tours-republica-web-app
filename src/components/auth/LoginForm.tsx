// components/auth/LoginForm.tsx  (or where your component lives)
"use client";

import React, { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login } = useAuth();
  const router = useRouter();

  // FORGOT modal state
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 4) newErrors.password = "Password min 4 chars";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || "Login failed");
      login(data.user, data.token);
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Login error");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle "Forgot Password?" submit
  const handleForgotSubmit = async () => {
    setForgotLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || "Error sending reset link");
      alert(data.message || "Reset link sent. Check your email or server console.");
      setShowForgot(false);
      setForgotEmail("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-[16px] font-[400] text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`input ${errors.email ? "border-red-500" : ""}`}
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between items-center w-full">
            <label className="block text-[16px] font-[400] text-gray-700 mb-2">Password</label>
            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-[12px] text-[#747D8F] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`input pr-12 ${errors.password ? "border-red-500" : ""}`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center bg-[#EE2552] justify-center py-3 rounded-lg font-semibold text-white ${
            isLoading ? "opacity-60 cursor-not-allowed" : "hover:scale-105"
          }`}
        >
          {isLoading ? <span>Signing in...</span> : <span>Login</span>}
        </button>
      </form>

      {/* Forgot Password Modal */}
      {showForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-[480px]">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Forgot Password?</h3>
            <p className="text-sm text-gray-600 mb-4">Enter your email and we'll send a reset link.</p>

            <input
              type="email"
              className="w-full p-3 bg-[#F4F7F9] border border-[#B5BAC5] rounded-lg mb-4"
              placeholder="hello@example.com"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowForgot(false)} className="px-4 py-2 bg-gray-100 rounded-lg">Close</button>
              <button
                onClick={handleForgotSubmit}
                disabled={forgotLoading}
                className="px-4 py-2 bg-[#EE2552] text-white rounded-lg"
              >
                {forgotLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
