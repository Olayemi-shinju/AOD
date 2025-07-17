import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Contexts/Context';
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaSpinner
} from 'react-icons/fa';

const Cart = () => {
  const {
    cartData,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    loadingCart,
    addToWishlist2
  } = useContext(CartContext);

  const { detailedItems = [] } = cartData;

  const [updatingId, setUpdatingId] = useState(null);
  const [clearing, setClearing] = useState(false);

  const handleIncrease = async (cartItemId, currentQty) => {
    setUpdatingId(cartItemId);
    await updateCartItemQuantity(cartItemId, currentQty + 1);
    setUpdatingId(null);
  };

  const handleDecrease = async (cartItemId, currentQty) => {
    if (currentQty > 1) {
      setUpdatingId(cartItemId);
      await updateCartItemQuantity(cartItemId, currentQty - 1);
      setUpdatingId(null);
    }
  };

  const handleRemove = async (cartItemId) => {
    setUpdatingId(cartItemId);
    await removeFromCart(cartItemId);
    setUpdatingId(null);
  };

  const handleClearCart = async () => {
    setClearing(true);
    await clearCart();
    setClearing(false);
  };

  const total = detailedItems.reduce((sum, item) => {
    const price =
      item.product?.discountPrice && item.product.discountPrice > 0
        ? item.product.discountPrice
        : item.product?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  if (loadingCart) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-3xl text-blue-500" />
        <span className="ml-2 text-blue-500 font-semibold">Loading Cart...</span>
      </div>
    );
  }

  return (
    <div className="lg:px-20 px-4 py-10 overflow-x-hidden">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold">Shopping Cart</h1>
        <div className="text-sm text-gray-400 mt-2 flex gap-2 flex-wrap">
          <Link to="/">Home</Link>
          <li className="list-disc">Shopping Cart</li>
        </div>
      </div>

      {detailedItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-lg">
          🛒 Your cart is currently empty.
          <div>
            <Link to="/" className="text-blue-500 hover:underline font-semibold mt-4 inline-block">
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product List */}
          <div className="flex-1 max-h-[550px] overflow-y-auto pr-2 custom-scroll space-y-6">
            {detailedItems.map((item) => {
              const price =
                item.product?.discountPrice && item.product.discountPrice > 0
                  ? item.product.discountPrice
                  : item.product?.price ?? 0;

              return (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white shadow rounded-lg p-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-contain rounded-md"
                    />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">{item.product.name}</h2>
                      <p className="text-gray-500 text-sm sm:text-base">₦{price.toLocaleString()}</p>

                      <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDecrease(item._id, item.quantity)}
                            disabled={item.quantity === 1 || updatingId === item._id}
                            className={`w-8 cursor-pointer h-8 flex items-center justify-center rounded-full border text-lg ${
                              item.quantity === 1 || updatingId === item._id
                                ? 'text-gray-300 border-gray-300 cursor-not-allowed'
                                : 'text-black border-gray-400 hover:bg-gray-200'
                            }`}
                          >
                            <FaMinus />
                          </button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleIncrease(item._id, item.quantity)}
                            disabled={updatingId === item._id}
                            className="w-8 cursor-pointer h-8 flex items-center justify-center rounded-full border border-gray-400 text-black hover:bg-gray-200"
                          >
                            <FaPlus />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item._id)}
                          disabled={updatingId === item._id}
                          className="ml-1 cursor-pointer text-red-500 hover:underline"
                        >
                          {updatingId === item._id ? (
                            <FaSpinner className="animate-spin w-4 h-4" />
                          ) : (
                            <span className="flex items-center gap-1">
                              <FaTrash /> Remove
                            </span>
                          )}
                        </button>

                        {/* Wishlist Button */}
                        <button
                          onClick={() => addToWishlist2(item.product._id)}
                          className="text-blue-500 cursor-pointer hover:underline ml-1"
                        >
                          💖 Wishlist
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-lg font-semibold text-right sm:text-left">
                    ₦{(price * item.quantity).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 bg-white shadow rounded-lg p-6 h-fit lg:sticky lg:top-24">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

            <div className="flex justify-between text-lg font-semibold mb-4">
              <span>Subtotal</span>
              <span>₦{total.toLocaleString()}</span>
            </div>

            <Link to="/checkout">
              <button
                disabled={detailedItems.length === 0}
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>
            </Link>

            <button
              onClick={handleClearCart}
              disabled={clearing || detailedItems.length === 0}
              className="mt-4 w-full cursor-pointer text-red-500 border border-red-500 py-2 rounded-lg hover:bg-red-50 transition disabled:opacity-50"
            >
              {clearing ? (
                <span className="flex items-center justify-center gap-2">
                  <FaSpinner className="animate-spin w-4 h-4" />
                  Clearing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FaTrash />
                  Clear Cart
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
