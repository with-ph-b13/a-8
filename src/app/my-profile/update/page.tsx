"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import { toast } from "react-toastify";

import { DEFAULT_AVATARS } from "@/data/avatars";

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
    await new Promise((res) => setTimeout(res, 800));

    updateUserProfile(name, image);
    toast.success("Profile updated successfully!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    router.push("/my-profile");

    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="max-w-xl w-full">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Update Profile</h1>
            <p className="text-gray-500 text-sm mb-10 text-pretty">Keep your profile fresh and up to date.</p>

            {/* Current preview */}
            <div className="flex items-center gap-6 mb-10 bg-green-50/50 rounded-2xl p-5 border border-green-100/50">
              <div className="relative group">
                <img
                  src={image || user?.image}
                  alt="preview"
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg transition-transform group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback";
                  }}
                />
                <div className="absolute -top-2 -right-2 bg-green-600 text-white p-1.5 rounded-lg shadow-md animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-bold text-gray-800 text-lg leading-tight">{name || user?.name || "Your Name"}</p>
                <p className="text-sm text-green-600 font-medium">{user?.email}</p>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Display Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      id="update-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Photo URL</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-green-600 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      id="update-image"
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Avatar Gallery */}
              <div className="space-y-4">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-bold text-gray-700">Premium Default Avatars</label>
                  <span className="text-[10px] uppercase tracking-widest font-black text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Pro Choice</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                  {DEFAULT_AVATARS.map((avatar) => (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => setImage(avatar.url)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-110 active:scale-95 ${
                        image === avatar.url ? "border-green-600 ring-2 ring-green-500/20 scale-105" : "border-gray-100 hover:border-green-300"
                      }`}
                    >
                      <img src={avatar.url} alt={avatar.name} className="w-full h-full object-cover" />
                      {image === avatar.url && (
                        <div className="absolute inset-0 bg-green-600/10 flex items-center justify-center">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                           </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  id="update-submit"
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2 group"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Save Changes</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="sm:w-32 bg-white border border-gray-200 text-gray-600 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
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
