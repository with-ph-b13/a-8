"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";

import dynamic from "next/dynamic";

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

function ProfileContent() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="max-w-xl w-full">
        {/* Glassmorphism Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform transition-all hover:scale-[1.01]">
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-green-600 to-green-800 relative">
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              <div className="relative">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl object-cover bg-white"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";
                  }}
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-lg shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 pb-8 px-8 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{user.name}</h1>
            <p className="text-green-600 font-medium flex items-center justify-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {user.email}
            </p>

            {/* Profile Info Grid */}
            <div className="mt-10 grid grid-cols-1 gap-4 text-left">
              <div className="bg-green-50/50 rounded-2xl p-4 border border-green-100/50">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Full Name</p>
                <p className="text-gray-800 font-semibold">{user.name}</p>
              </div>
              <div className="bg-green-50/50 rounded-2xl p-4 border border-green-100/50">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Email Address</p>
                <p className="text-gray-800 font-semibold">{user.email}</p>
              </div>
            </div>

            {/* Lottie Animation or subtle decoration */}
            <div className="mt-8 flex justify-center">
               <div className="w-32 h-32 opacity-80">
                  <Lottie 
                    animationData={require("@/data/user-animation.json")} 
                    loop={true} 
                  />
               </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/my-profile/update"
                id="update-profile-btn"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 font-bold text-white transition-all duration-200 bg-green-700 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-900 hover:bg-green-800 shadow-lg shadow-green-200"
              >
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Update Profile
                </span>
              </Link>
              
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3.5 font-bold text-gray-700 transition-all duration-200 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-green-700 focus:outline-none shadow-sm"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MyProfilePage() {
  return (
    <PrivateRoute>
      <ProfileContent />
    </PrivateRoute>
  );
}
