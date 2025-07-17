import React, { useContext, useState } from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import './modal.css';
import { CartContext } from "../Contexts/Context";

const ShoppingCartDrawer = () => {
  const { closeCartModal, cartData, removeFromCart } = useContext(CartContext);
  const cart = cartData?.detailedItems || [];
  const subtotal = cartData?.subtotal || 0;

  const [loadingId, setLoadingId] = useState(null); // Track loading item

  const handleRemove = async (itemId) => {
    if (loadingId) return; // prevent double clicks
    setLoadingId(itemId);
    try {
      await removeFromCart(itemId);
    } catch (err) {
      console.error("Error removing item from cart", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="fixed right-0 w-[70%] top-0 h-full xl:w-[320px] bg-white shadow-lg z flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 border-b">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <button className="text-xl rotate cursor-pointer">
          <FiX onClick={closeCartModal} />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-5">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 mb-6 border-b pb-4 last:border-b-0"
            >
              <img
                src={item.product?.image}
                alt={item.product.name}
                className="w-[70px] h-[70px] object-cover rounded-md"
              />
              <div className="flex flex-col justify-between w-full">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium leading-tight">
                      {item.product.name}
                    </p>
                    <p className="text-sm font-semibold mt-1">
                      ₦{item.product.price.toLocaleString()} × {item.quantity}
                    </p>
                  </div>

                  <button
                    className={`text-sm cursor-pointer p-1 rounded-full hover:bg-gray-100 transition ${
                      loadingId === item._id ? "pointer-events-none" : ""
                    }`}
                    onClick={() => handleRemove(item._id)}
                    disabled={loadingId === item._id}
                  >
                    {loadingId === item._id ? (
                      <svg
                        className="animate-spin h-5 w-5 text-gray-600"
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
                      <MdOutlineClose />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="border-t p-5">
          <div className="flex justify-between text-sm font-medium mb-4">
            <span>Subtotal:</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>

          <Link to="/cart" onClick={closeCartModal}>
            <button className="w-full cursor-pointer bg-black text-white py-2 rounded mb-3 text-sm font-semibold hover:opacity-90">
              View Cart
            </button>
          </Link>

          <Link to="/checkout" onClick={closeCartModal}>
            <button className="w-full border cursor-pointer border-black text-black py-2 rounded text-sm font-semibold hover:bg-black hover:text-white transition-all">
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartDrawer;
