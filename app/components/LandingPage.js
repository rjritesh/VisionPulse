"use client";
import { Validate } from "@/utils/validate";
import { useState } from "react";
import ObjectDetection from "../components/objectDetection";
import { FiCpu, FiCamera, FiMail } from "react-icons/fi";

export default function LandingPage() {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setemail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const [started, setstarted] = useState(false);

  const handleSubmit = () => {
    const message = Validate(email);
    setErrorMessage(message);

    if (!message) {
      setSubmittedEmail(email); // save valid email
      setemail(""); // clear input
      setisModalOpen(false); // close modal
      setTimeout(() => {
        const element = document.getElementById("camera-section");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleModalOpenBtn = () => {
    setisModalOpen(true);
  };
  return (
    <div
      className="bg-gray-900 text-white font-sans relative overflow-x-hidden"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* Hero Section */}
      <section className="relative flex justify-center items-center h-[80vh] max-w-7xl mx-auto px-6">
        {/* Floating Gradient Blobs */}
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-purple-700 rounded-full opacity-50 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blue-500 rounded-full opacity-50 blur-3xl animate-pulse"></div>

        {/* Hero Content */}
        <div className="text-center z-10 space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
             AI surveillance System
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
            Detect objects in real-time, capture screenshots, and receive
            instant email notifications.
          </p>
          <button
            className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-8 rounded-lg text-white hover:opacity-90 transition"
            onClick={handleModalOpenBtn}
          >
            Get Started
          </button>
        </div>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-8 rounded-3xl w-full max-w-md relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => {
                setisModalOpen(false);
                setErrorMessage("");
                setemail("");
              }}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">
              Send Screenshot to Your Email
            </h2>
            <p className="text-gray-300 text-center mb-6">
              Enter your email and we’ll send you a screenshot of detected
              objects.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4"
            >
              <input
                type="email"
                required
                value={email} // bind state
                onChange={(e) => {
                  setemail(e.target.value); // update state
                  setErrorMessage(null); // clear error while typing
                }}
                placeholder="Enter your email"
                className="p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                className="bg-purple-600 py-3 px-6 rounded-lg hover:bg-purple-700 transition text-white"
                onClick={handleSubmit}
              >
                Submit
              </button>
              {errorMessage && (
                <p className="text-red-500 text-sm font-semibold">
                  {errorMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 -mt-16 z-10 relative">
        <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl text-center hover:scale-105 transform transition">
          <FiCpu size={48} className="mb-4 text-purple-500" />
          <h2 className="text-2xl font-semibold mb-2">Real-Time Detection</h2>
          <p className="text-gray-300">
            Powered by TensorFlow coco-ssd, detects objects instantly.
          </p>
        </div>
        <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl text-center hover:scale-105 transform transition">
          <FiCamera size={48} className="mb-4 text-purple-500" />
          <h2 className="text-2xl font-semibold mb-2">Screenshot Capture</h2>
          <p className="text-gray-300">
            Automatically captures images of detected objects.
          </p>
        </div>
        <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl text-center hover:scale-105 transform transition">
          <FiMail size={48} className="mb-4 text-purple-500" />
          <h2 className="text-2xl font-semibold mb-2">Email Notifications</h2>
          <p className="text-gray-300">
            Receive screenshots via email instantly.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-8 rounded-3xl shadow-xl hover:scale-105 transform transition">
            <h3 className="text-2xl font-semibold mb-2">Step 1</h3>
             <p>Open the app and allow webcam access for live surveillance.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-3xl shadow-xl hover:scale-105 transform transition">
            <h3 className="text-2xl font-semibold mb-2">Step 2</h3>
            <p>The AI detects objects in real-time and highlights them.</p>
          </div>
          <div className="bg-gray-800 p-8 rounded-3xl shadow-xl hover:scale-105 transform transition">
            <h3 className="text-2xl font-semibold mb-2">Step 3</h3>
            <p>A screenshot is captured and sent directly to your email.</p>
          </div>
        </div>
      </section>

      {submittedEmail && (
        <div
          id="camera-section"
          className="transition-all duration-700 ease-in-out"
        >
          <ObjectDetection email={submittedEmail} />
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400">
        &copy; {new Date().getFullYear()} Ritesh. All rights reserved.
      </footer>
    </div>
  );
}
