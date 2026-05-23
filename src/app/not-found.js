 
import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Arab Samachar",
  description: "The page you are looking for is not available on Arab Samachar.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      
      <h1 className="text-5xl font-bold mb-4">404</h1>

      <p className="mb-2 text-2xl font-semibold">क्षमा करें!</p>

      <p className="text-lg md:text-xl text-gray-600 max-w-xl">
        जो सामग्री आप खोज रहे हैं वो उपलब्ध नहीं है।
      </p>

      <p className="text-gray-500 mt-2 mb-6">
        होम पेज पर जाएँ या ताज़ा खबरें देखें।
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-[#c4132a] text-white px-5 py-2 rounded"
        >
          Home
        </Link>

        <Link
          href="/breaking"
          className="border border-gray-400 px-5 py-2 rounded"
        >
          Latest News
        </Link>
      </div>

    </main>
  );
}