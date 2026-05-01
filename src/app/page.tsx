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
        className="relative min-h-[85vh] flex items-center overflow-hidden"
        style={{
          background: "linear-gradient(rgba(0,40,0,0.7), rgba(0,20,0,0.8)), url('/img/animal_1.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-400 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-green-600 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 text-white z-10 w-full">
          <div className="max-w-3xl">
            <span className="inline-block bg-green-500/20 backdrop-blur-md border border-green-400/30 text-green-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-6 animate-fade-in">
              Eid-ul-Adha 2026 Special 🌙
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
              Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500">Livestock</span> <br />
              Booking Made Easy
            </h1>
            <p className="text-lg md:text-xl text-green-100/80 mb-10 leading-relaxed font-light">
              Experience the future of Qurbani with Bangladesh&apos;s most trusted livestock marketplace. 
              Find healthy, Shariah-compliant animals from verified farms.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/animals"
                className="bg-green-600 hover:bg-green-500 text-white font-black px-10 py-5 rounded-2xl text-lg transition-all transform hover:scale-105 shadow-xl shadow-green-900/40 flex items-center gap-2"
              >
                Browse Animals 🐃
              </Link>
              <a
                href="#tips"
                className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all"
              >
                Qurbani Tips
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST & STATS SECTION ===== */}
      <section className="relative -mt-16 z-20 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 border border-gray-100">
          {[
            { label: "Total Animals", val: "1,200+", icon: "🐄" },
            { label: "Verified Farms", val: "85+", icon: "🛡️" },
            { label: "Happy Clients", val: "5k+", icon: "✨" },
            { label: "Towns Covered", val: "12", icon: "📍" },
          ].map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <p className="text-2xl md:text-3xl font-black text-gray-800">{stat.val}</p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED ANIMALS ===== */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight italic">Handpicked Selection</h2>
            <p className="text-gray-500 text-lg">Our top-rated animals for this season, verified for health and quality.</p>
          </div>
          <Link
            href="/animals"
            className="text-green-700 font-bold hover:text-green-800 flex items-center gap-2 group transition-all"
          >
            Explore Full Catalog <span className="group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </div>

        {animals.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        )}
      </section>

      {/* ===== QURBANI TIPS SECTION ===== */}
      <section id="tips" className="bg-green-50 py-24 border-y border-green-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16 text-center md:text-left">
            <div className="w-48 h-48 bg-white rounded-full p-4 shadow-xl shadow-green-900/5 flex items-center justify-center border border-green-100">
              <Lottie animationData={tipsAnimation} loop={true} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Qurbani Preparation Guide</h2>
              <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
                We believe in providing more than just livestock. Here are essential tips to ensure your Qurbani 
                is both spiritually and practically successful.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {tips.map((tip) => (
              <div
                key={tip.title}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-green-100"
              >
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-3xl mb-6">{tip.icon}</div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">{tip.title}</h3>
                <p className="text-gray-500 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOP BREEDS SECTION ===== */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Exquisite Breeds</h2>
          <p className="text-gray-500 text-lg">Discovery the finest livestock breeds available in our platform</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {breeds.map((breed) => (
            <div
              key={breed.name}
              className="group relative bg-white border border-gray-100 rounded-3xl p-8 text-center hover:bg-green-600 transition-all duration-500"
            >
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-500">{breed.emoji}</div>
              <h3 className="font-black text-gray-800 text-xl mb-3 group-hover:text-white transition-colors">{breed.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-green-100 transition-colors">{breed.desc}</p>
              <div className="absolute inset-0 border-2 border-green-500 rounded-3xl scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all pointer-events-none"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
