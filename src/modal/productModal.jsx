import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { CartContext } from "../Contexts/Context";
import { toast } from "react-toastify";

const ProductModal = ({ handleClose, product }) => {
  const [count, setCount] = useState(1);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWish, setLoadingWish] = useState(false);

  const { addToWishlist, addToCart } = useContext(CartContext);

  const increase = () => setCount(prev => (prev < product.quantity ? prev + 1 : prev));
  const decrease = () => setCount(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    setLoadingCart(true);
    try {
      const result = await addToCart(product._id, count);
      if (result) {
        toast.success(`${product.name} added to cart`);
        handleClose();
      }
    } catch (error) {
      toast.error(error.message || "Failed to add to cart");
    } finally {
      setLoadingCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    setLoadingWish(true);
    try {
      const result = await addToWishlist(product._id);
      if (result) {
        toast.success(`${product.name} added to wishlist`);
        handleClose();
      }
    } catch (error) {
      toast.error(error.message || "Failed to add to wishlist");
    } finally {
      setLoadingWish(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-white h-[100vh] md:h-[80vh] lg:h-[70vh] overflow-y-auto p-6 w-full max-w-4xl mx-4 rounded-xl shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <IoCloseOutline className="text-2xl text-gray-500 hover:text-gray-700" />
          </button>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-8 h-full">
            {/* Image Gallery */}
            <div className="w-full md:w-1/2 h-full flex flex-col">
              <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-4">
                <motion.img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain max-h-[300px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto py-2">
                  {product.images.slice(0, 4).map((img, index) => (
                    <div
                      key={index}
                      className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden cursor-pointer border-2 border-transparent hover:border-blue-400"
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                {product.brand && (
                  <p className="text-sm text-gray-500 mb-3">Brand: {product.brand}</p>
                )}
                
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  ₦{Number(product.price).toLocaleString()}
                </div>

                {product.discount > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm line-through text-gray-400">
                      ₦{(Number(product.price) * (1 + product.discount/100)).toLocaleString()}
                    </span>
                    <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description || "No description available"}
                  </p>
                </div>

                {product.quantity > 0 ? (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-700">Quantity:</span>
                      <span className="text-sm text-gray-500">
                        {product.quantity} available
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-lg w-[120px]">
                        <button
                          onClick={decrease}
                          disabled={count <= 1 || loadingCart || loadingWish}
                          className="text-gray-600 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed"
                        >
                          <FiMinus />
                        </button>
                        <span className="font-medium">{count}</span>
                        <button
                          onClick={increase}
                          disabled={count >= product.quantity || loadingCart || loadingWish}
                          className="text-gray-600 hover:text-blue-600 disabled:text-gray-300 disabled:cursor-not-allowed"
                        >
                          <GoPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6">
                    <p className="text-sm font-medium">This product is currently out of stock</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={loadingCart || loadingWish || product.quantity <= 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loadingCart ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>

                <button
                  onClick={handleAddToWishlist}
                  disabled={loadingWish || loadingCart}
                  className="border border-gray-300 hover:border-gray-400 text-gray-700 w-full py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loadingWish ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    "Add to Wishlist"
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;