import React from 'react'
import { Users, Church, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#531253]">Sheaf</h1>
        <nav className="flex items-center gap-4">
          <a href="/login" className="text-sm font-medium text-gray-700 hover:text-[#531253]">
            Log in
            </a>
          <a
          href="/register"
            className="text-sm font-medium bg-[#531253] text-white px-4 py-2 rounded-lg hover:bg-[#3d0e3d] transition-colors">
            Get Started
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 -right-32 lg:w-120 lg:h-120 w-96 h-96 rounded-full bg-[#531253]/7" />
        <div className="absolute top-40 -left-24  lg:w-120 lg:h-120 w-72 h-72 rounded-full bg-[#531253]/7" />

        <div className="max-w-4xl mx-auto px-6 py-24 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Church Giving, <span className="text-[#531253]">Simplified</span>
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Sheaf makes it effortless for churches to manage tithes and offerings.
            Members give in seconds. Admins see everything in real time.
          </p>
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
             <a href="/register"
              className="bg-[#531253] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#3d0e3d] transition-colors"
            >
              Join as a Member
            </a>
            
             <a href="/register-church"
              className=" border border-[#531253] text-[#531253] px-8 py-3 rounded-lg font-medium hover:bg-[#531253]/5 transition-colors"
            >
              Register Your Church
              {/* <span className="absolute -top-2 -right-2 bg-[#531253] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Soon
              </span> */}
            </a>
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-[#531253] hover:underline">
              Log in
            </a>
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#531253]/10 flex items-center justify-center mb-4">
              <Users className="text-[#531253]" size={22} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">For Members</h3>
            <p className="text-gray-600 mb-4">
              Give tithes and offerings in a few taps. Track your giving history and download statements anytime.
            </p>
            <a href="/register" className="text-sm font-medium text-[#531253] hover:underline">
              Join as a Member →
            </a>
          </div>

          <div className="p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#531253]/10 flex items-center justify-center mb-4">
                <Church className="text-[#531253]" size={22} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">For Churches</h3>
            <p className="text-gray-600 mb-4">
              See giving trends in real time, manage members, and export reports whenever you need them.
            </p>
            <a href="/register-church" className="text-sm font-medium text-[#531253] hover:underline">
              Register Your Church →
            </a>
          </div>

          <div className="p-8 rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#531253]/10 flex items-center justify-center mb-4">
              <Shield className="text-[#531253]" size={22} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Secure by Design</h3>
            <p className="text-gray-600">
              Every payment is processed securely. Your data stays protected.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <p className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Sheaf. Built for churches.
        </p>
      </footer>
    </div>
  );
}
