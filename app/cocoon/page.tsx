"use client";

import ImageCarousel from "./ImageCarousel";

export default function CocoonPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-orange-700 to-orange-900 text-white">
      <div className="w-full text-center mt-12 mb-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to Cocoon</h1>
        <p className="text-xl">A wireframe for a digital hub for internation students for your local university.</p>
      </div>
      <ImageCarousel />
    </div>
  );
}