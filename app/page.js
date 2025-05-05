"use client";
import { useState } from "react";
import Image from "next/image";
import ObjectDetection from "./components/objectDetection";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleStartSurveillance = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    setStarted(true);
  };

  return (
    <main className="relative min-h-screen bg-black text-white px-4 md:px-8 py-12 flex flex-col justify-between items-center font-sans overflow-hidden">
      {/* Top Nav */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center px-4 md:px-10 py-4 bg-black/30 backdrop-blur-md z-50 border-b border-purple-800">
        <div className="text-purple-400 text-lg md:text-xl font-semibold flex items-center gap-2">
          <span className="bg-purple-800 text-white text-xs px-2 py-0.5 rounded-full">Beta</span>
          <span>Vision Pulse</span>
        </div>
        <nav className="space-x-4 text-sm text-gray-300 hidden md:block">
          <a href="#" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">Product</a>
          <a href="#" className="hover:text-white">Pricing</a>
          <a href="#" className="hover:text-white">Blog</a>
          <a href="#" className="hover:text-white">Company</a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="z-10 max-w-7xl w-full flex flex-col-reverse lg:flex-row justify-between items-center gap-10 pt-32 md:pt-40">
        {/* Left Text + Form */}
        <div className="flex-1 text-center lg:text-left px-4">
          <p className="text-sm text-purple-300 border border-purple-800 px-4 py-1 inline-block rounded-full mb-4">
            No installations or special devices required
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Your AI-<br />Powered CCTV<br />Surveillance
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-400">
          AI Eyes That Never Blink — Security Made Simple.
          </p>

          {/* Email Input & Button */}
          {!started && (
            <div className="mt-6 flex flex-col sm:flex-row gap-3 items-start lg:items-center">
              <div className="w-full sm:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-3 w-full rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-800"
                />
                {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}
              </div>
              <button
                onClick={handleStartSurveillance}
                className="bg-purple-700 hover:bg-purple-800 transition text-white px-6 py-3 rounded-full shadow-md"
              >
                Start Surveillance
              </button>
            </div>
          )}
        </div>

        {/* Right Image */}
        <div className="flex-1 relative w-full max-w-sm md:max-w-md lg:max-w-lg">
          <Image
            src="/hero-ai-4.png"
            alt="3D AI Robot"
            width={500}
            height={500}
            className="rounded-xl shadow-purple-800 shadow-md w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Camera Preview Centered */}
      {started && (
        <div className="mt-10 w-full flex justify-center items-center px-4">
          <div className="max-w-5xl w-full">
            <ObjectDetection email={email} />
          </div>
        </div>
      )}

      
    </main>
  );
}
