"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import googleIcon from "@/app/assets/google.jpeg"; 

export default function LoginPage() {
    const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setIsLoading(false);

    if(data.success){
        router.push("/dashboard")
    }else{

        setMessage(data.message);
    }
  }

  function handleGoogleLogin() {
    console.log("Google login clicked")
  }

  return (


    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left branding panel */}
      <div className="hidden md:flex md:w-1/2 bg-[#531253] text-white flex-col justify-center px-16 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 lg:w-120 lg:h-120 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute bottom-0 right-0 lg:w-120 lg:h-120 w-72 h-72 rounded-full bg-white/5" />
        <h1 className="text-4xl font-bold mb-4 relative">Sheaf</h1>
        <p className="text-white/80 text-lg relative max-w-sm">
          Give with ease. Track with clarity. Church giving, simplified.
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="md:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#531253]">Sheaf</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
          <p className="text-gray-500 mb-8">Log in to continue giving.</p>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 mb-6 hover:bg-gray-50 transition-colors"
          >
            <GoogleIcon />
            <span className="text-sm font-medium text-gray-700">Continue with Google</span>
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#531253] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#531253] focus:border-transparent"
              />
            </div>

            {message && <p className="text-sm text-red-600">{message}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#531253] text-white py-2.5 rounded-lg font-medium hover:bg-[#3d0e3d] transition-colors disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            New here?{" "}
            <a href="/register" className="text-[#531253] font-medium hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
   <Image src={googleIcon} alt="Google" width={20} height={20}/>
  );
}