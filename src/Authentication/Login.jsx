import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CartContext } from '../Contexts/Context';

export default function LoginPage() {
  const { setData, setUser, getUserCart } = useContext(CartContext)
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('')
  const [loader, setLoader] = useState(false)
  const [formData, setFormData] = useState({
    password: '',
    email: '',
  })

  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      if (!formData.password || !formData.email) {
        setError('Please fill all fields');
        setLoader(false);
        return;
      }

      const resp = await axios.post(`${VITE_API_BASE_URL}/login`, formData);
      if (resp.data.success === true) {
        toast.success(resp.data.msg);
        setData(resp.data.user)
        await getUserCart()
        setUser(resp.data.user)
        
        const oneWeekMs = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
        
        const dataToStore = {
          value: resp.data.user,
          expiry: new Date().getTime() + oneWeekMs,
        };
        
        localStorage.setItem('user', JSON.stringify(dataToStore)); // STRINGIFY ONCE!
        setLoader(false);
        if (window.syncLocalUser) {
          window.syncLocalUser();
        }
        navigate('/');
      } else {
        toast.error(resp.msg);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error.response?.data?.msg);
    }
  };




  return (
    <div className="xl:min-h-screen py-6 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name='email'
              value={formData.email}
              onChange={handleChange}
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
                name='password'
                value={formData.password}
                onChange={handleChange}
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
            {
              error && <p className="h-5 text-lg text-red-600 p-2">{error}</p>
            }

            <div className="text-right text-sm mt-2">
              <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loader}
            className="w-full wish cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loader ? (
              <div className="flex justify-center items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Please wait...
              </div>
            ) : (
              "Login"
            )}
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
