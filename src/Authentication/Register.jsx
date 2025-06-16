import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const RegisterPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="py-7 flex items-center justify-center bg-gray-50 px-4">
            <motion.form
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md"
                onSubmit={(e) => e.preventDefault()}
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h2>

                <button
                    type="button"
                    className="w-full cursor-pointer border border-gray-300 flex items-center justify-center gap-2 p-3 rounded-md text-sm font-medium hover:bg-gray-100 transition"
                >
                    <FcGoogle size={20} /> Continue with Google
                </button>

                <div className="flex items-center justify-between my-6">
                    <span className="border-t w-1/5 border-gray-300"></span>
                    <span className="text-sm text-gray-500">or register with email</span>
                    <span className="border-t w-1/5 border-gray-300"></span>
                </div>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full p-3 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>

                    <div className="flex items-start gap-2 text-sm">
                        <input
                            type="checkbox"
                            className="mt-1"
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <span className="text-gray-600">
                            I accept the{" "}
                            <a href="#" className="text-blue-500 underline">
                                Terms & Conditions
                            </a>
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={!isChecked}
                        className="w-full wish cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Register
                    </button>
                </div>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </motion.form>
        </div>
    );
};

export default RegisterPage;
