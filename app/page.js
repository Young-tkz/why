import Link from "next/link";

export default function Home() {
  return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-6xl font-bold mb-6">
            Lets Play A Game
          </h1>

          <p className="text-xl text-gray-400 mb-10">
            its about you and me
          </p>

          <Link
              href="/chat"
              className="inline-block px-8 py-4 rounded-2xl bg-white text-black font-semibold text-lg hover:scale-105 transition"
          >
            Start
          </Link>
        </div>
      </main>
  );
}