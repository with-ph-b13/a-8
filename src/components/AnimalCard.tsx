import Link from "next/link";

// Type for a single animal
export type Animal = {
  id: number;
  name: string;
  type: string;
  breed: string;
  price: number;
  weight: number;
  age: number;
  location: string;
  description: string;
  image: string;
  category: string;
};

type AnimalCardProps = {
  animal: Animal;
};

export default function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Animal image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* Type badge */}
        <span
          className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full ${
            animal.type === "Cow"
              ? "bg-orange-100 text-orange-700"
              : "bg-purple-100 text-purple-700"
          }`}
        >
          {animal.type}
        </span>
      </div>

      {/* Card content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-800 text-lg">{animal.name}</h3>
        <p className="text-sm text-gray-500 mb-1">{animal.breed}</p>

        <div className="flex items-center justify-between mt-2 mb-3">
          <span className="text-green-700 font-bold text-lg">
            ৳{animal.price.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400">📍 {animal.location}</span>
        </div>

        <div className="text-xs text-gray-400 mb-4 flex gap-3">
          <span>⚖️ {animal.weight} kg</span>
          <span>🗓️ {animal.age} yrs</span>
        </div>

        {/* Details button */}
        <Link
          href={`/details/${animal.id}`}
          className="mt-auto bg-green-700 hover:bg-green-800 text-white text-center py-2 rounded-lg text-sm font-medium transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
