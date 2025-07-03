import { useContext, useEffect } from "react";
import { CartContext } from "../Contexts/Context";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function WishlistPage() {
  const {
    user,
    data,
    wishlist,
    getMyWishlist,
    removeFromWishlist,
    clearWishlist,
    loadingWishlist,
    addToCart2,
  } = useContext(CartContext);

  useEffect(() => {
    if (!user) return;
    getMyWishlist();
  }, [user, getMyWishlist]);

  const handleRemove = async (id) => {
    await removeFromWishlist(id);
  };

  const handleClear = async () => {
    await clearWishlist();
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart2(productId, 1);
    } catch (error) {
      toast.error("Failed to add to cart.");
    }
  };

  if (loadingWishlist) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-50">
        <svg
          className="animate-spin h-12 w-12 text-blue-600"
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
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 01-8 8h4l-3 3 3 3h-4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6 overflow-x-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-2">
          Wishlist
        </h1>
        <p className="text-gray-700 mb-6 text-md sm:text-lg whitespace-nowrap">
          <Link to="/">Home</Link> &bull; Wishlist &bull;{" "}
          {data?.name || "User"}
        </p>

        {wishlist.length === 0 ? (
          <p className="text-gray-600 text-center py-8 text-lg">
            Your wishlist is empty. Explore products and add your favorites!
          </p>
        ) : (
          <>
            <div className="w-full overflow-x-auto">
              <table className="min-w-[600px] w-full text-left border-t border-b border-blue-100">
                <thead className="bg-blue-100 text-blue-800">
                  <tr>
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Action</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {wishlist.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td className="flex items-center gap-4 px-4 py-4 whitespace-nowrap">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                        />
                        <span className="font-semibold text-blue-900 text-sm sm:text-base">
                          {item.product.name}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-blue-700 font-medium whitespace-nowrap">
                        ₦{item.product.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          className="bg-blue-600 cursor-pointer text-white text-sm px-3 py-1.5 rounded hover:bg-blue-700 transition"
                          onClick={() => handleAddToCart(item.product._id)}
                        >
                         {loadingWishlist? 'Please Wait' : 'Add to Cart'}
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                         {loadingWishlist? 'Processing...' : 'Remove'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={handleClear}
              >
               {loadingWishlist? 'Processing...':'Clear All'}
              </button>
              <Link
                to="/cart"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                Go To Cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
