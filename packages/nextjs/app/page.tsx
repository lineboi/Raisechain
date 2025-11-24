"use client";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gray-900">
      <div className="text-center max-w-2xl p-8 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-8">
          Now you can Donate to those who faced disaster in a safe and secure way.
          <br />
          <span className="text-teal-400 font-black">RaiseChain</span> is here to help you.
        </h1>

        <button className="px-8 py-3 mt-6 text-lg font-semibold text-gray-900 bg-teal-400 rounded-lg shadow-lg  hover:bg-teal-300 transition duration-300 ease-in-out transform hover:scale-105">
          🔑 Connect Wallet
        </button>
      </div>
    </main>
  );
}
