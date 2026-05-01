"use client";

import { useState } from "react";
import animalsData from "@/data/animals.json";
import AnimalCard, { Animal } from "@/components/AnimalCard";

export default function AllAnimalsPage() {
  const [sortOrder, setSortOrder] = useState<"default" | "low" | "high">("default");

  // Sort animals based on selected order
  const animals = [...(animalsData as Animal[])].sort((a, b) => {
    if (sortOrder === "low") return a.price - b.price;
    if (sortOrder === "high") return b.price - a.price;
    return a.id - b.id; // default order by id
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Animals</h1>
          <p className="text-gray-500 mt-1">
            {animals.length} animals available for Qurbani
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-gray-600 font-medium">
            Sort by price:
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "default" | "low" | "high")}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="default">Default</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </div>

      {/* Animals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {animals.map((animal) => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>
    </div>
  );
}
