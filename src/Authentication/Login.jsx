import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="xl:min-h-screen py-6 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>

        <form className="space-y-5">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="you@example.com" 
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                className="w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="••••••••" 
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <div className="text-right text-sm mt-2">
              <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full wish cursor-pointer bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px bg-gray-300 w-full"></div>
            <p className="text-sm text-gray-500">or</p>
            <div className="h-px bg-gray-300 w-full"></div>
          </div>

          <button 
            type="button" 
            className="w-full cursor-pointer border border-gray-300 flex items-center justify-center gap-2 p-3 rounded-md text-sm font-medium hover:bg-gray-100 transition"
          >
            <FcGoogle size={20} /> Continue with Google
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}
