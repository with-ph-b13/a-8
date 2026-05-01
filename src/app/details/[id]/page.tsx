"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import animalsData from "@/data/animals.json";
import { Animal } from "@/components/AnimalCard";
import { toast } from "react-toastify";
import { notFound } from "next/navigation";
import { use } from "react";

type PageProps = {
  params: Promise<{ id: string }>;
};

type BookingForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const emptyForm: BookingForm = { name: "", email: "", phone: "", address: "" };

function AnimalDetailsContent({ id }: { id: string }) {
  const { user } = useAuth();
  const [form, setForm] = useState<BookingForm>({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update form if user changes (e.g. login/logout or update)
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name,
        email: prev.email || user.email,
      }));
    }
  }, [user]);

  // Find the animal by id
  const animal = (animalsData as Animal[]).find((a) => a.id === Number(id));

  if (!animal) {
    notFound();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate a short delay
    await new Promise((res) => setTimeout(res, 800));

    toast.success(`🎉 Booking confirmed for ${animal.name}! We'll contact you soon.`);
    
    // Reset form but keep user info
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
    });
    setSubmitting(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Animal Details (8 cols on lg) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl shadow-xl shadow-green-900/5 overflow-hidden border border-gray-100">
            {/* Main Image */}
            <div className="relative group overflow-hidden">
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md text-green-800 text-xs font-bold px-4 py-2 rounded-full shadow-sm border border-green-100">
                  Verified Animal 🛡️
                </span>
              </div>
            </div>

            {/* Info Content */}
            <div className="p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                    {animal.name}
                  </h1>
                  <p className="text-green-600 font-medium mt-1 flex items-center gap-1">
                    <span className="text-xl">📍</span> {animal.location}
                  </p>
                </div>
                <div className="bg-green-50 px-6 py-3 rounded-2xl border border-green-100 text-center">
                  <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">
                    Booking Price
                  </p>
                  <p className="text-3xl font-black text-green-700">
                    ৳{animal.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Type", val: animal.type, icon: animal.type === "Cow" ? "🐄" : "🐐" },
                  { label: "Breed", val: animal.breed, icon: "🧬" },
                  { label: "Weight", val: `${animal.weight} kg`, icon: "⚖️" },
                  { label: "Age", val: `${animal.age} yrs`, icon: "🗓️" },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <p className="text-xl mb-1">{item.icon}</p>
                    <p className="text-xs text-gray-400 font-semibold uppercase">{item.label}</p>
                    <p className="text-sm font-bold text-gray-800">{item.val}</p>
                  </div>
                ))}
              </div>

              <div className="prose prose-green max-w-none">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span>📜</span> Description
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg italic border-l-4 border-green-200 pl-4 bg-green-50/30 py-4 rounded-r-xl">
                  &quot;{animal.description}&quot;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Form (5 cols on lg) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl shadow-2xl shadow-green-900/10 p-8 border border-green-50 sticky top-24">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span>📋</span> Secure Booking
              </h2>
              <p className="text-gray-500 text-sm">
                Complete the form below to reserve this animal. Our agent will call you for confirmation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="e.g. 01700-000000"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Delivery Address</label>
                <textarea
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Enter your full delivery address"
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-black py-5 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-900/20 flex items-center justify-center gap-3"
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  "Confirm Booking Request 🐃"
                )}
              </button>
              
              <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-4">
                🔒 Your data is secure and will only be used for booking
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component with PrivateRoute
export default function AnimalDetailsPage({ params }: PageProps) {
  const { id } = use(params);

  return (
    <PrivateRoute>
      <AnimalDetailsContent id={id} />
    </PrivateRoute>
  );
}
