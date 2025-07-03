import React, { useState, useEffect, useContext } from 'react';
import './SecondNav.css';
import { Link } from 'react-router-dom';
import { BsHeart } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { CartContext } from '../Contexts/Context';
import ShoppingCartDrawer from '../modal/CartModal';
import logo from '../assets/Logo.png';

const ScrollNav = () => {
    const [showNav, setShowNav] = useState(false);

    const {
        openCartModal,
        openModal,
        closeCartModal,
        wishlist,
        cartData
    } = useContext(CartContext);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShowNav(true);
            } else {
                setShowNav(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <div className={`scroll-nav ${showNav ? 'nav-visible' : ''}`}>
                <div className='flex w-full lg:px-18 bg-white p-10 py-5 shadow justify-between items-center'>
                    <div className='flex items-center justify-between w-[45%]'>
                        <Link to='/'>
                            <div className='lg:flex xl:flex'>
                                <img src={logo} alt="Logo" className='w-[70px]' />
                            </div>
                        </Link>

                        <div className='hidden lg:flex xl:flex 2xl:flex'>
                            <ul className='flex items-center gap-5'>
                                <Link to='/'><li className='text-md texts'>Home</li></Link>
                                <Link to='/categories'><li className='text-md texts'>Shop</li></Link>
                                <Link to='/about'><li className='text-md texts'>About Us</li></Link>
                                <Link to='/contact'><li className='text-md texts'>Contact</li></Link>
                            </ul>
                        </div>
                    </div>

                    <div className='flex items-center lg:gap-7 gap-7'>

                        {/* ✅ Wishlist icon with count */}
                        <div className='relative'>
                            <Link to='/wish'>
                                <BsHeart className='text-2xl cursor-pointer logo' />
                                {wishlist?.length > 0 && (
                                    <div className='absolute -top-2 -right-2 h-[18px] w-[18px] bg-black text-white text-xs rounded-full flex items-center justify-center'>
                                        {wishlist.length}
                                    </div>
                                )}
                            </Link>
                        </div>

                        {/* Cart icon (unchanged) */}
                        <div className='flex items-start relative'>
                    
                                <div className='absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                                    {cartData.totalItems}
                                </div>
                            <FiShoppingCart className='text-2xl cursor-pointer logo' onClick={openCartModal} />
                        </div>

                    </div>
                </div>
            </div>

            {/* Cart Modal and backdrop */}
            {openModal && (
                <div>
                    <ShoppingCartDrawer />
                    <div
                        className="fixed z-50 inset-0 bg-black/40 cursor-crosshair transition-opacity duration-300"
                        onClick={closeCartModal}
                    />
                </div>
            )}
        </div>
    );
};

export default ScrollNav;
