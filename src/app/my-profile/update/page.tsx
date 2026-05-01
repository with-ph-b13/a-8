"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import { toast } from "react-toastify";

function UpdateProfileContent() {
  const { user, updateUserProfile } = useAuth();
  const router = useRouter();

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Small delay for UX
    await new Promise((res) => setTimeout(res, 400));

    updateUserProfile(name, image);
    toast.success("Profile updated successfully!");
    router.push("/my-profile");

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Update Information</h1>
        <p className="text-gray-500 text-sm mb-8">Change your name or profile picture</p>

        {/* Current preview */}
        <div className="flex items-center gap-4 mb-8 bg-gray-50 rounded-xl p-4">
          <img
            src={image || user?.image}
            alt="preview"
            className="w-16 h-16 rounded-full object-cover border-2 border-green-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback";
            }}
          />
          <div>
            <p className="font-semibold text-gray-800">{name || user?.name}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              id="update-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
            <input
              id="update-image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            id="update-submit"
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {loading ? "Updating..." : "Update Information"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function UpdateProfilePage() {
  return (
    <PrivateRoute>
      <UpdateProfileContent />
    </PrivateRoute>
  );
}
