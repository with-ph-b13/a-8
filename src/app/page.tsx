"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import animalsData from "@/data/animals.json";
import AnimalCard, { Animal } from "@/components/AnimalCard";
import Lottie from "lottie-react";

// A simple cow walking Lottie animation (from LottieFiles public domain)
// Using a JSON animation inline – a simple bouncing circle as fallback
const tipsAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 200,
  h: 200,
  nm: "tips",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            { t: 0, s: [100, 160, 0], e: [100, 60, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
            { t: 30, s: [100, 60, 0], e: [100, 160, 0], i: { x: 0.4, y: 1 }, o: { x: 0.6, y: 0 } },
            { t: 60 },
          ],
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [50, 50] } },
            { ty: "fl", c: { a: 0, k: [0.1, 0.5, 0.1, 1] }, o: { a: 0, k: 100 } },
            { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
    },
  ],
};

const tips = [
  {
    icon: "🩺",
    title: "Health Check",
    desc: "Always verify that the animal is healthy, active, and free from disease before purchase.",
  },
  {
    icon: "🌿",
    title: "Proper Feeding",
    desc: "Ensure the animal has been fed with natural, clean food and has access to fresh water.",
  },
  {
    icon: "📜",
    title: "Shariah Guidelines",
    desc: "The animal should meet age and health requirements as per Islamic Shariah for valid Qurbani.",
  },
  {
    icon: "🔍",
    title: "Check Documents",
    desc: "Ask for vaccination certificates and health records from the seller before booking.",
  },
];

const breeds = [
  { name: "Local Deshi", emoji: "🐄", desc: "Most common in Bangladesh, hardy and economical." },
  { name: "Friesian", emoji: "🐄", desc: "Large body, imported breed, premium quality meat." },
  { name: "Shahiwal", emoji: "🐄", desc: "Medium-sized, gentle natured, popular in western BD." },
  { name: "Black Bengal Goat", emoji: "🐐", desc: "Pride of Bangladesh, finest quality goat meat." },
];

export default function HomePage() {
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    // Simulate loading with a small delay
    const timer = setTimeout(() => {
      setAnimals(animalsData as Animal[]);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const featured = animals.slice(0, 4);

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section
        className="relative bg-cover bg-center min-h-[70vh] flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,60,0,0.65), rgba(0,40,0,0.75)), url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1400&h=700&fit=crop')",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 text-white text-center w-full">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Find Your Perfect <br />
            <span className="text-green-300">Qurbani Animal</span>
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-8 max-w-xl mx-auto">
            Browse healthy cows and goats from trusted sellers across Bangladesh. Book with
            confidence for a blessed Eid.
          </p>
          <Link
            href="/animals"
            className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-full text-lg transition-colors inline-block"
          >
            Browse Animals 🐃
          </Link>
        </div>
      </section>

      {/* ===== FEATURED ANIMALS ===== */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Featured Animals</h2>
          <p className="text-gray-500 mt-2">Handpicked top animals for this Qurbani season</p>
        </div>

        {animals.length === 0 ? (
          // Loading spinner
          <div className="flex items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/animals"
            className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            View All Animals →
          </Link>
        </div>
      </section>

      {/* ===== QURBANI TIPS SECTION ===== */}
      <section className="bg-green-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
            {/* Lottie animation */}
            <div className="w-32 h-32 flex-shrink-0">
              <Lottie animationData={tipsAnimation} loop={true} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Qurbani Preparation Tips</h2>
              <p className="text-gray-500 mt-2">
                Make your Qurbani experience smooth and spiritually fulfilling
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">{tip.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOP BREEDS SECTION ===== */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Popular Qurbani Breeds</h2>
          <p className="text-gray-500 mt-2">Most sought-after breeds in Bangladesh</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {breeds.map((breed) => (
            <div
              key={breed.name}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center hover:from-green-100 hover:to-green-200 transition-colors"
            >
              <div className="text-5xl mb-3">{breed.emoji}</div>
              <h3 className="font-bold text-green-800 text-lg mb-2">{breed.name}</h3>
              <p className="text-sm text-green-600">{breed.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
