// Contexts/Context.js
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(false);

  const openCartModal = () => setOpenModal(true);
  const closeCartModal = () => setOpenModal(false);

  const values = {
    openModal,
    openCartModal,
    closeCartModal,
  };

  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  );
};
