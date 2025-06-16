import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
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
                    Forgot Password
                </h2>

                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter your email and we’ll send you a link to reset your password.
                </p>

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full wish cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
                    >
                        Send Reset Link
                    </button>
                </div>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Remembered your password?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </motion.form>
        </div>
    );
};

export default ForgotPasswordPage;
