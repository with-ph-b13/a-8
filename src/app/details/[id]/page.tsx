"use client";

import { useState } from "react";
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
  const [form, setForm] = useState<BookingForm>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  // Find the animal by id
  const animal = (animalsData as Animal[]).find((a) => a.id === Number(id));

  if (!animal) {
    notFound();
  }

  // Pre-fill email from logged-in user
  const initialEmail = user?.email || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate a short delay
    await new Promise((res) => setTimeout(res, 500));

    toast.success(`Booking request submitted for ${animal.name}! 🎉`);
    setForm(emptyForm); // Reset form
    setSubmitting(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Animal details */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-10">
        <div className="md:flex">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src={animal.image}
              alt={animal.name}
              className="w-full h-72 md:h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="md:w-1/2 p-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{animal.name}</h1>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  animal.type === "Cow"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {animal.type}
              </span>
            </div>

            <p className="text-3xl font-bold text-green-700 mb-4">
              ৳{animal.price.toLocaleString()}
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-6">
              <div>
                <span className="font-semibold">Breed:</span> {animal.breed}
              </div>
              <div>
                <span className="font-semibold">Weight:</span> {animal.weight} kg
              </div>
              <div>
                <span className="font-semibold">Age:</span> {animal.age} years
              </div>
              <div>
                <span className="font-semibold">Location:</span> {animal.location}
              </div>
              <div>
                <span className="font-semibold">Category:</span> {animal.category}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{animal.description}</p>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">
          📋 Book This Animal
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={form.email || initialEmail}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="e.g. 01700000000"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Address
            </label>
            <textarea
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Enter your full delivery address"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-green-400 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {submitting ? "Submitting..." : "Submit Booking Request"}
          </button>
        </form>
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
