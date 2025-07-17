import { useContext, useEffect } from "react";
import { CartContext } from "../Contexts/Context";
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
    if (user) getMyWishlist();
  }, [user, getMyWishlist]);

  const handleRemove = async (id) => await removeFromWishlist(id);
  const handleClear = async () => await clearWishlist();
  const handleAddToCart = async (productId) => await addToCart2(productId, 1);

  const primaryBlue = "bg-[#1E3A8A]"; // Deep blue
  const hoverBlue = "hover:bg-[#1E40AF]";
  const lightBlueBg = "bg-[#F0F4FF]";
  const grayText = "text-[#4B5563]";

  if (loadingWishlist) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#1E3A8A]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-1">My Wishlist</h1>
          <p className={`${grayText} text-base`}>
            <Link to="/" className="text-[#1E40AF] hover:underline">Home</Link> &nbsp;&bull;&nbsp; Wishlist &nbsp;&bull;&nbsp;{" "}
            {data?.name || "User"}
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <img
              src="/empty-wishlist.svg"
              alt="Empty wishlist"
              className="w-40 mx-auto mb-6"
            />
            <p className={`${grayText} text-lg mb-4`}>
              Your wishlist is empty. Browse and add your favorites.
            </p>
            <Link
              to="/"
              className={`inline-block ${primaryBlue} ${hoverBlue} text-white px-6 py-2 rounded-md transition`}
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <>
            <div className="w-full overflow-x-auto">
              <table className="min-w-[640px] w-full text-left border-t border-b border-gray-200">
                <thead className={`${lightBlueBg} text-gray-700 text-sm uppercase tracking-wide`}>
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-800">
                  {wishlist.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-4 flex items-center gap-4 whitespace-nowrap">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-14 h-14 rounded object-contain border border-gray-200"
                        />
                        <span className="font-medium">{item.product.name}</span>
                      </td>
                      <td className="px-4 py-4 font-semibold text-[#1E3A8A] whitespace-nowrap">
                        ₦{item.product.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap flex gap-3">
                        <button
                          onClick={() => handleAddToCart(item.product._id)}
                          className={`${primaryBlue} ${hoverBlue} text-white text-sm px-4 py-2 rounded-md transition`}
                        >
                          {loadingWishlist ? "Please wait..." : "Add to Cart"}
                        </button>
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          {loadingWishlist ? "Removing..." : "Remove"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <button
                onClick={handleClear}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
              >
                {loadingWishlist ? "Clearing..." : "Clear Wishlist"}
              </button>
              <Link
                to="/cart"
                className={`${primaryBlue} ${hoverBlue} text-white px-6 py-2 rounded-md transition`}
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
