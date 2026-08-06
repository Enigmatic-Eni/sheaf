"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterChurchPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    churchName: "",
    churchEmail: "",
    churchPhone: "",
    churchAddress: "",
    adminName: "",
    adminEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);
    const res = await fetch("/api/register-church", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setIsLoading(false);

    if (!data.success) {
      setError(data.message);
      return;
    }

    router.push("/login?churchRegistered=true");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-[#531253] text-white flex-col justify-center px-16 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 lg:w-120 lg:h-120 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-0  lg:w-120 lg:h-120 w-72 h-72 rounded-full bg-white/5" />
        <h1 className="text-4xl font-bold mb-4 relative">Sheaf</h1>
        <p className="text-white/80 text-lg relative max-w-sm">
          Bring your church onto Sheaf and manage giving with clarity.
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          <div className="md:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#531253]">Sheaf</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Register your church</h2>
          <p className="text-gray-500 mb-8">
            A super admin will review and approve your church shortly after you sign up.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-[#531253] uppercase tracking-wide mb-3">
                Church Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Church Name</label>
                  <input
                    type="text"
                    required
                    value={form.churchName}
                    onChange={(e) => update("churchName", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#531253] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Church Email</label>
                  <input
                    type="email"
                    required
                    value={form.churchEmail}
                    onChange={(e) => update("churchEmail", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#531253] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Church Phone</label>
                  <input
                    type="tel"
                    required
                    value={form.churchPhone}
                    onChange={(e) => update("churchPhone", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#531253] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Church Address</label>
                  <input
                    type="text"
                    required
                    value={form.churchAddress}
                    onChange={(e) => update("churchAddress", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#531253] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#531253] uppercase tracking-wide mb-3">
                Your Admin Account
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.adminName}
                    onChange={(e) => update("adminName", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#531253] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Email (for login)</label>
                  <input
                    type="email"
                    required
                    value={form.adminEmail}
                    onChange={(e) => update("adminEmail", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#531253] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#531253] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#531253] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#531253] text-white py-2.5 rounded-lg font-medium hover:bg-[#3d0e3d] transition-colors disabled:opacity-50"
            >
              {isLoading ? "Registering..." : "Register Church"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already registered?{" "}
            <a href="/login" className="text-[#531253] font-medium hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}