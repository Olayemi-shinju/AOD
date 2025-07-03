import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
     
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!email) {
                setError('Pls Fill the Field')
                return
            }

            const resp = await axios.post('http://localhost:7000/api/v1/forgot-password', {email})
            if (resp.data.success === true) {
                toast.success(resp.data.msg)
            } else {
                toast.error(resp.data.msg)
            }
        } catch (error) {
            toast.error(error.response?.data?.msg)
        }
    }
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
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email Address"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {
                        error && <p className="h-5 text-lg text-red-600 p-2">{error}</p>
                    }

                    <button
                        type="submit"
                        onClick={handleSubmit}
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
