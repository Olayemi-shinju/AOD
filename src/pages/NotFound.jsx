import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6 text-center">
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>

      {/* Large 404 Text */}
      <div className="text-blue-600 font-extrabold text-[120px] sm:text-[160px] leading-none select-none">
        404
      </div>

      {/* Title */}
      <h1 className="mt-2 text-2xl sm:text-4xl font-semibold text-blue-700 uppercase">
        Page Not Found
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-gray-500 text-base max-w-md">
        The page you're looking for doesn’t exist or might have been moved. Please return to the homepage.
      </p>

      {/* Back Home Button */}
      <Link to="/" className="mt-8">
        <button className="bg-blue-600 hover:bg-blue-700 transition text-white text-sm font-medium px-6 py-3 rounded-lg shadow-md">
          Back to Homepage
        </button>
      </Link>
    </div>
  );
}
