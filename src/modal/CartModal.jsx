import React, { useContext } from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import './modal.css'
import { CartContext } from "../Contexts/Context";
const ShoppingCartDrawer = () => {
    const {closeCartModal, openModal} = useContext(CartContext)
    return (
        <div className="fixed right-0 top-0 h-full xl:w-[320px] bg-white shadow-lg z-50 flex flex-col">
            
            <div className="flex justify-between items-center px-5 py-4 border-b">
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <button className="text-xl rotate cursor-pointer">
                    <FiX onClick={closeCartModal}/>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
                <div className="flex gap-4 mb-6">
                    <img
                        src="https://solaroid.sirv.com/cart-img.png" // Use your own product image URL here
                        alt="Product"
                        className="w-[70px] h-[70px] object-cover rounded-md"
                    />
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium leading-tight">
                                Tiger Neo MONO-half cut 580W
                            </p>
                            <p className="text-sm font-semibold mt-1">₦170,100 ×1</p>
                        </div>
                        <button className="text-sm text cursor-pointer">
                           <MdOutlineClose/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t p-5">
                <div className="flex justify-between text-sm font-medium mb-4">
                    <span>Subtotal:</span>
                    <span>₦170,100</span>
                </div>

                <Link to="/cart" onClick={closeCartModal}>
                    <button className="w-full cursor-pointer bg-black text-white py-2 rounded mb-3 text-sm font-semibold hover:opacity-90">
                        View Cart
                    </button>
                </Link>

                <Link to="/checkout">
                    <button className="w-full border cursor-pointer border-black text-black py-2 rounded text-sm font-semibold hover:bg-black hover:text-white transition-all">
                        Checkout
                    </button>
                </Link>
            </div>

           
        </div>
    );
};

export default ShoppingCartDrawer;
