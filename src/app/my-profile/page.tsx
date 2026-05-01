"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";

function ProfileContent() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        {/* Avatar */}
        <img
          src={user.image}
          alt={user.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-green-200 object-cover"
        />

        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
        <p className="text-gray-500 mt-1">{user.email}</p>

        <div className="mt-6 bg-green-50 rounded-xl p-4 text-sm text-gray-600 text-left">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Photo:</span>{" "}
            <a
              href={user.image}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 hover:underline break-all"
            >
              {user.image}
            </a>
          </p>
        </div>

        {/* Update button */}
        <Link
          href="/my-profile/update"
          id="update-profile-btn"
          className="mt-6 inline-block bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-lg transition-colors"
        >
          ✏️ Update Information
        </Link>
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
