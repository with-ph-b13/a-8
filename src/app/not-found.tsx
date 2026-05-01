import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-4">🐄</div>
        <h1 className="text-6xl font-bold text-green-700 mb-3">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Oops! This animal wandered off. The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-full transition-colors"
        >
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}
