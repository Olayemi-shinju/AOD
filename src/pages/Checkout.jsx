import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Contexts/Context";
import { toast } from "react-toastify";
import axios from "axios";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 👈 new loading state
  const { data, cartData, getUserCart } = useContext(CartContext);

  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.value?.token;
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    region: "",
    landmark: "",
    notes: "",
  });

  const post = {
    street: formData.street,
    region: formData.region,
    landmark: formData.landmark,
    notes: formData.notes?.trim() || "N/A",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in to place your order");
      return;
    }

    setIsLoading(true); // 👈 start loader

    try {
      const resp = await axios.post(`${VITE_API_BASE_URL}/checkout`, post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (resp.data.success === true) {
        toast.success(resp.data.msg);
        navigate("/profile");
        await getUserCart()
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.response?.data?.msg || "An error occurred");
    } finally {
      setIsLoading(false); // 👈 stop loader
    }
  };

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        street: data.street || "",
        landmark: data.landmark || "",
        region: data.region || "",
      }));
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const { name, email, phone, street, region } = formData;
    setIsFormValid(!!(name && email && phone && street && region));
  }, [formData]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans bg-gray-50 text-gray-800">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold mb-1">Checkout</h1>
        <div className="text-sm sm:text-lg text-gray-500">
          <Link to="/" className="text-gray-800 hover:underline">
            Home
          </Link>{" "}
          • Checkout
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 bg-white shadow-md rounded-xl p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-5">Billing Details</h2>

          <div className="space-y-5">
            {[{ label: "Full Name", name: "name", required: true, type: "text" },
              {
                label: "Email Address",
                name: "email",
                required: true,
                type: "email",
                readOnly: true,
                extraClasses: "bg-gray-100",
              },
              { label: "Phone Number", name: "phone", required: true, type: "tel" },
              { label: "Street Address", name: "street", required: true, type: "text" },
              { label: "Landmark (optional)", name: "landmark", type: "text" },
              { label: "Region/Area", name: "region", required: true, type: "text" },
            ].map(({ label, name, required, type, readOnly = false, extraClasses = "" }) => (
              <div key={name}>
                <label className="block mb-1 font-bold">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  type={type}
                  readOnly={readOnly}
                  className={`w-full p-3 border border-gray-300 rounded ${extraClasses}`}
                />
              </div>
            ))}

            <div>
              <label className="block mb-1 font-bold">Order Notes (optional)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[33%] bg-white shadow-md rounded-xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-5">Your Order</h2>

            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
              <table className="w-full text-sm sm:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-3 font-medium">Product</th>
                    <th className="text-right p-3 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData?.detailedItems?.map((item) => {
                    const price =
                      item.product?.discountPrice && item.product.discountPrice > 0
                        ? item.product.discountPrice
                        : item.product?.price ?? 0;
                    const total = price * item.quantity;

                    return (
                      <tr key={item._id} className="border-b border-gray-200">
                        <td className="p-3">
                          {item.product?.name} × {item.quantity}
                        </td>
                        <td className="p-3 text-right font-semibold">₦{total.toLocaleString()}</td>
                      </tr>
                    );
                  })}

                  <tr className="bg-gray-50">
                    <td className="p-3 font-medium">Subtotal</td>
                    <td className="p-3 text-right font-semibold">
                      ₦
                      {cartData?.detailedItems
                        ?.reduce((acc, item) => {
                          const price =
                            item.product?.discountPrice && item.product.discountPrice > 0
                              ? item.product.discountPrice
                              : item.product?.price ?? 0;
                          return acc + price * item.quantity;
                        }, 0)
                        .toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {isFormValid && (
            <button
              onClick={handleSubmit}
              type="submit"
              disabled={isLoading}
              className={`mt-4 w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded transition duration-200 flex items-center justify-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin mr-2 h-5 w-5 text-white"
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
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
