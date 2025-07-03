// src/Contexts/Context.js
import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [cartData, setCart] = useState({
    detailedItems: [],
    subtotal: 0,
    totalItems: 0,
  });

  const [cartTotal, setCartTotal] = useState(0);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [actionLoading, setActionLoading] = useState(false); // NEW
  const [openModal, setOpenModal] = useState(false);

  const token = user?.token;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { value, expiry } = JSON.parse(storedUser);
      if (new Date().getTime() > expiry) {
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/login";
      } else {
        setUser(value);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
      try {
        const resp = await axios.get(
          `http://localhost:7000/api/v1/get-single-user/${user.id}`
        );
        setData(resp.data.data);
        if (token) {
          await getMyWishlist();
          await getUserCart();
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, [user?.id]);

  // ---------------- WISHLIST ---------------- //
  const getMyWishlist = useCallback(async () => {
    if (!token) return;
    try {
      setLoadingWishlist(true);
      const resp = await axios.get("http://localhost:7000/api/v1/wishlist/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist(resp.data.data || []);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
      toast.error("Failed to fetch wishlist.");
    } finally {
      setLoadingWishlist(false);
    }
  }, [token]);

  const addToWishlist = async (productId) => {
    if (!token) return toast.error("Please login to add to wishlist.");
    try {
      await axios.post(
        `http://localhost:7000/api/v1/wishlist/add/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await getMyWishlist();
      await getUserCart();
      toast.success("Product added to wishlist!");
    } catch (error) {
      console.error("Add to wishlist failed", error);
      toast.error(error.response?.data?.msg || "Failed to add product.");
    }
  };

  const addToWishlist2 = async (productId) => {
    if (!token) return toast.error("Please login to add to wishlist.");
    try {
      await axios.post(
        `http://localhost:7000/api/v1/add-to-wishlist/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await getMyWishlist();
      await getUserCart();
      toast.success("Product added to wishlist!");
    } catch (error) {
      console.error("Add to wishlist failed", error);
      toast.error(error.response?.data?.msg || "Failed to add product.");
    }
  };

  const removeFromWishlist = async (wishlistId) => {
    if (!token) return toast.error("Please login to modify wishlist.");
    try {
      setActionLoading(true); // start
      await axios.delete(
        `http://localhost:7000/api/v1/wishlist/remove/${wishlistId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await getMyWishlist();
      toast.info("Product removed from wishlist.");
    } catch (error) {
      console.error("Remove from wishlist failed", error);
      toast.error("Failed to remove product.");
    } finally {
      setActionLoading(false); // end
    }
  };

  const clearWishlist = async () => {
    if (!token) return toast.error("Please login to clear wishlist.");
    try {
      setActionLoading(true); // start
      await axios.delete(`http://localhost:7000/api/v1/wishlist/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlist([]);
      toast.info("Wishlist cleared.");
    } catch (error) {
      console.error("Clear wishlist failed", error);
      toast.error("Failed to clear wishlist.");
    } finally {
      setActionLoading(false); // end
    }
  };

  // ---------------- CART ---------------- //
  const getUserCart = async () => {
    if (!token) return;
    try {
      setLoadingCart(true);
      const res = await axios.get("http://localhost:7000/api/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoadingCart(false);
    }
  };

  const addToCart2 = async (productId, quantity) => {
    if (!token) return (window.location.href = "/login");
    try {
      setActionLoading(true); // start
      const res = await axios.post(
        "http://localhost:7000/api/v1/add-to-cart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await getUserCart();
      await getMyWishlist();
      toast.success("Added to cart!");
      return res.data;
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error(error.response?.data?.msg || "Error adding to cart.");
    } finally {
      setActionLoading(false); // end
    }
  };

  const addToCart = async (productId, quantity) => {
    if (!token) return (window.location.href = "/login");
    try {
      const res = await axios.post(
        "http://localhost:7000/api/v1/add",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await getUserCart();
      await getMyWishlist();
      setCart(res.data);
      toast.success("Added to cart!");
      return res.data;
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error(error.response?.data?.msg || "Error adding to cart.");
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (!token) return (window.location.href = "/login");
    try {
      const res = await axios.delete(
        `http://localhost:7000/api/v1/remove/${cartItemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await getUserCart();
      if (res.data.success === true) {
        setCart(res.data);
        toast.info("Product removed from cart.");
      }
    } catch (error) {
      console.error("Delete cart item failed:", error);
      toast.error("Failed to remove product.");
    }
  };

  const clearCart = async () => {
    if (!token) return (window.location.href = "/login");
    try {
      await axios.delete("http://localhost:7000/api/v1/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart([]);
      setCartTotal(0);
      toast.info("Cart cleared.");
    } catch (err) {
      console.error("Clear cart failed:", err);
      toast.error("Failed to clear cart.");
    }
  };

  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    if (!token) return toast.error("Please login to update cart.");
    if (newQuantity < 1) return toast.warning("Quantity must be at least 1.");
    try {
      const res = await axios.patch(
        `http://localhost:7000/api/v1/update/${cartItemId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data);
    } catch (error) {
      console.error("Failed to update cart item quantity:", error);
      toast.error(error.response?.data?.msg || "Error updating cart.");
    }
  };

  // ---------------- MODAL ---------------- //
  const openCartModal = () => setOpenModal(true);
  const closeCartModal = () => setOpenModal(false);

  // ---------------- CONTEXT VALUES ---------------- //
  const values = {
    user,
    setUser,
    data,
    setData,
    wishlist,
    getMyWishlist,
    addToWishlist,
    addToWishlist2,
    removeFromWishlist,
    clearWishlist,
    loadingWishlist,
    cartData,
    updateCartItemQuantity,
    getUserCart,
    addToCart,
    addToCart2,
    removeFromCart,
    clearCart,
    loadingCart,
    cartTotal,
    openModal,
    openCartModal,
    closeCartModal,
    actionLoading, // added to context
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
