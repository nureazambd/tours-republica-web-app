// app/reset-password/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token") ?? "";
  const email = params.get("email") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password || password.length < 4) return alert("Password min 4 chars");
    if (password !== confirm) return alert("Passwords do not match");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, email }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.error || "Reset failed");
      alert(data.message || "Password updated. You can now log in.");
      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-8">
      <div className="w-[480px] bg-white shadow rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-1">Reset Password</h2>
        <p className="text-sm text-gray-600 mb-6">Enter a new password for {email || "your account"}.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">New Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full p-3 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Confirm Password</label>
            <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" className="w-full p-3 border rounded-lg" />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => router.push("/login")} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
            <button onClick={handleReset} disabled={loading} className="px-4 py-2 bg-[#EE2552] text-white rounded-lg">
              {loading ? "Saving..." : "Password reset"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
