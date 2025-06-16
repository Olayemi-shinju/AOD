import React, { useState, useEffect, useContext } from 'react';
import './SecondNav.css';
import { Link } from 'react-router-dom';
import { BsHeart } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { CartContext } from '../Contexts/Context';
import ShoppingCartDrawer from '../modal/CartModal';

const ScrollNav = () => {
    const [showNav, setShowNav] = useState(false);
    const { openCartModal, openModal, closeCartModal } = useContext(CartContext)
    useEffect(() => {
        const handleScroll = () => {
            // Show nav if scrollY > 50px
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
        <div className={`scroll-nav ${showNav ? 'nav-visible' : ''}`}>
            <div className='flex w-full lg:px-18 bg-white p-10 py-5 shadow justify-between items-center'>
                <div className='flex items-center justify-between w-[45%]'>
                    <div className='flex-col w-[10%] leading-2 text-blue-700'>
                        <h1 className='text-2xl font-bold'>AOD</h1>
                        <p className='text-sm font-extralight'>Solatricity</p>
                    </div>

                    <div className='hidden lg:flex xl:flex 2xl:flex'>
                        <ul className='flex items-center gap-5 '>
                            <Link to='/'><li className='text-md texts'>Home</li></Link>
                            <Link to='/categories'><li className='text-md texts'>Shop</li></Link>
                            <Link to='/about'><li className='text-md texts'>About Us</li></Link>
                            <Link to='/contact'><li className='text-md texts'>Contact</li></Link>
                        </ul>
                    </div>
                </div>

                <div className='flex items-center lg:gap-7 gap-4'>
                    <BsHeart className='text-2xl cursor-pointer logo' />
                    <div className='flex items-start'>
                        <div className='border-[1.5px] absolute top-[22px] ml-4 border-white rounded-full h-[20px] w-[20px] flex items-center justify-center bg-black'>
                            <p className='text-white text-xs'>1</p>
                        </div>
                        <FiShoppingCart className='relative text-2xl cursor-pointer logo' onClick={openCartModal} />
                    </div>
                </div>
            </div>
            {
                openModal && <div>
                    <ShoppingCartDrawer /> <div
                        className={`fixed inset-0 bg-black/40 cursor-crosshair transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                        onClick={closeCartModal}
                    />
                </div>
            }
        </div>
    );
};

export default ScrollNav;
