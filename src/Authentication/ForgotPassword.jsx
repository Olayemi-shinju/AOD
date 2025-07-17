import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Pls Fill the Field');
            return;
        }
        setError('');
        setLoading(true);
        try {
            const resp = await axios.post(`${VITE_API_BASE_URL}/forgot-password`, { email });
            if (resp.data.success === true) {
                toast.success(resp.data.msg);
            } else {
                toast.error(resp.data.msg);
            }
        } catch (error) {
            toast.error(error.response?.data?.msg || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-7 flex items-center justify-center bg-gray-50 px-4">
            <motion.form
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md"
                onSubmit={handleSubmit}
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
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email Address"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && <p className="h-5 text-lg text-red-600 p-2">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition disabled:opacity-60"
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                />
                            </svg>
                        ) : (
                            "Send Reset Link"
                        )}
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
