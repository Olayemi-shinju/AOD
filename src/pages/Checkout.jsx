import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    region: "",
    landmark: "",
    notes: "",
  });
  const [localUser, setLocalUser] = useState(null); // ✅ local user state
  
    // ✅ Check localStorage for user
    useEffect(() => {
      const stored = localStorage.getItem('user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed?.value && parsed.expiry > Date.now()) {
            setLocalUser(parsed.value);
          } else {
            localStorage.removeItem('user');
          }
        } catch {
          localStorage.removeItem('user');
        }
      }
    }, []);

    const navigate = useNavigate()

    if(!localUser){
            navigate('/login')
    }

  const [isFormValid, setIsFormValid] = useState(false);

  // Update form field
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Check if required fields are filled
  useEffect(() => {
    const { fullName, email, phone, street, region } = formData;
    const isValid = fullName && email && phone && street && region;
    setIsFormValid(isValid);
  }, [formData]);

  return (
    <div className="max-w-4xl mx-auto p-6 pt-10 font-sans">
      {/* Breadcrumb */}
    <div className="flex leading-10 gap-6 flex-col">
          <h1 className="text-4xl text-gray-700 font-bold mb-2">Checkout</h1>
      <div className="text-lg text-gray-400 px-6 mb-24">
        <span className="text-gray-800"><Link to='/'>Home</Link> • Checkout</span>
      </div>
    </div>

      {/* Page Title */}

      <div className="grid md:grid-cols-2 gap-10">
        {/* Billing Details */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Billing Details</h2>

          <div className="space-y-5">
            <div>
              <label className="block mb-1 font-bold">Full Name <span className="text-red-500">*</span></label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block mb-1 font-bold">Email Address <span className="text-red-500">*</span></label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block mb-1 font-bold">Phone Number <span className="text-red-500">*</span></label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="08012345678"
              />
            </div>

            <div>
              <label className="block mb-1 font-bold">Street Address <span className="text-red-500">*</span></label>
              <input
                name="street"
                value={formData.street}
                onChange={handleChange}
                type="text"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="House number and street name"
              />
            </div>

            <div>
              <label className="block mb-1 font-bold">Landmark (optional)</label>
              <input
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                type="text"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="White house near the market"
              />
            </div>

            <div>
              <label className="block mb-1 font-bold">Region/Area <span className="text-red-500">*</span></label>
              <input
                name="region"
                value={formData.region}
                onChange={handleChange}
                type="text"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ibadan, Lagos, etc"
              />
            </div>

            <div>
              <label className="block mb-1 font-bold">Order Notes (optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Notes for delivery..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Your Order</h2>

          <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3 font-medium">Product</th>
                  <th className="text-right p-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3">CWORTH ENERGY 120A CHARGE</td>
                  <td className="p-3 text-right font-semibold">₦252,000</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3">CONTROLLER × 1</td>
                  <td className="p-3 text-right">—</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 font-medium">Subtotal</td>
                  <td className="p-3 text-right font-semibold">₦252,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Conditional Order Button */}
          {isFormValid && (
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded transition duration-200"
            >
              Place Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
