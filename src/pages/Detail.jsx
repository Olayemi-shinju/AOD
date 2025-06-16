import React, { useState } from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import './detail.css';
import paypalImg from '../assets/images/paypal.png';
import { Link, useParams } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams()

    const [activeTab, setActiveTab] = useState('features'); // 'features' or 'reviews'
    const [count, setCount] = useState(1)

    const increase = () => {
        setCount(prev => prev + 1)
    }
    const decrease = () => {
        setCount(prev => (prev > 1 ? prev - 1 : 1));
    };
    const product = [
        {
            id: 1,
            image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14',
            name: 'Alpha Solar Panel',
            descp: ' The SMK 11kVA Hybrid Inverter is a robust and scalable energy solution designed for both residential and commercial applications...',
            title: 'solar/img',
            price: '100000',
            brand: 'inverters',
            category: 'Solar Panels'
        },
        {
            id: 2,
            image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14',
            name: 'Gamma Solar Panel',
            descp: ' The SMK 11kVA Hybrid Inverter is a robust and scalable energy solution designed for both residential and commercial applications...',
            title: 'solar/img',
            price: '200000',
            brand: 'inverters',
            category: 'Solar Panels'
        },
        {
            id: 3,
            image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14',
            name: 'Zeta Solar Panel',
            title: 'solar/img',
            descp: ' The SMK 11kVA Hybrid Inverter is a robust and scalable energy solution designed for both residential and commercial applications...',
            price: '500000',
            brand: 'inverters',
            category: 'Solar Panels'
        },
        {
            id: 4,
            image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14',
            name: 'Zeta Solar Panel',
            title: 'solar/img',
            descp: ' The SMK 11kVA Hybrid Inverter is a robust and scalable energy solution designed for both residential and commercial applications...',
            price: '500000',
        },
        {
            id: 5,
            image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14',
            name: 'Zeta Solar Panel',
            title: 'solar/img',
            descp: ' The SMK 11kVA Hybrid Inverter is a robust and scalable energy solution designed for both residential and commercial applications...',
            price: '500000',
        },
        {
            id: 6,
            image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14',
            name: 'Zeta Solar Panel',
            title: 'solar/img',
            descp: ' The SMK 11kVA Hybrid Inverter is a robust and scalable energy solution designed for both residential and commercial applications...',
            price: '500000',
        },
        {
            id: 7,
            image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14',
            name: 'Zeta Solar Panel',
            title: 'solar/img',
            descp: ' The SMK 11kVA Hybrid Inverter is a robust and scalable energy solution designed for both residential and commercial applications...',
            price: '500000',
        },
        {
            id: 8,
            image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14',
            name: 'Zeta Solar Panel',
            title: 'solar/img',
            descp: ' The SMK 11kVA Hybrid Inverter is a robust and scalable energy solution designed for both residential and commercial applications...',
            price: '500000',
        },
        {
            id: 9,
            image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14',
            name: 'Zeta Solar Panel',
            title: 'solar/img',
            descp: ' The SMK 11kVA Hybrid Inverter is a robust and scalable energy solution designed for both residential and commercial applications...',
            price: '500000',
        },
        {
            id: 10,
            image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14',
            name: 'Zeta Solar Panel',
            title: 'solar/img',
            descp: ' The SMK 11kVA Hybrid Inverter is a robust and scalable energy solution designed for both residential and commercial applications...',
            price: '500000',
        },
        {
            id: 11,
            image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14',
            name: 'Zeta Solar Panel',
            title: 'solar/img',
            descp: ' The SMK 11kVA Hybrid Inverter is a robust and scalable energy solution designed for both residential and commercial applications...',
            price: '500000',
        },
    ];

    const productItem = product.find(item => item.id === parseInt(id));


    return (
        <div className='xl:px-10 p-2 xl:py-10'>
            {/* Breadcrumb */}
            <div className='xl:flex px-4 gap-2 items-center'>
                <div className='text-gray-400 text-md flex items-center'>
                    <AiOutlineHome className='text-lg' />
                    <Link to='/'>Home</Link>
                </div>
                <div className='text-gray-400 text-md'>
                    <p>• {productItem.brand}</p>
                </div>
                <div className='text-md'>
                    <p><span className='text-gray-400'>•</span> SMK 11KVA HYBRID INVERTER WITH 160A</p>
                </div>
            </div>

            {/* Main Section */}
            <div className='flex flex-col lg:flex-row gap-6 p-5 min-h-[900px]'>
                {/* Left Images Section - Sticky */}
                <div className='lg:w-[70%]'>
                    <div className='sticky top-0 flex gap-4'>
                        <div className='flex flex-col gap-2 w-[15%]'>
                            <img
                                src={productItem.image}
                                alt='thumb'
                                className='w-full h-auto border rounded-sm object-cover'
                            />
                        </div>
                        <div className='w-[85%]'>
                            <img
                                src={productItem.image}
                                alt='main'
                                className='w-[90%] h-[90%] rounded-md object-cover'
                            />
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className='lg:w-[60%]'>
                    <div className='flex flex-col bg-white'>
                        <h2 className='text-sm text-gray-500 mb-2'>Inverters</h2>
                        <p className='text-2xl lg:text-3xl font-semibold text-gray-800 leading-snug'>
                            {productItem.name}
                        </p>

                        <div className='bg-gray-200 mt-3 w-[80px] text-center'>
                            <span className='text-blue-500 text-sm font-semibold'>In Stock</span>
                        </div>

                        <div className='mt-5'>
                            <h1 className='text-sm text-gray-700 leading-7'>
                                {productItem.descp}
                            </h1>
                        </div>

                        <div className='py-3'>
                            <p className='text-2xl font-semibold'>₦{parseInt(productItem.price).toLocaleString()}.00</p>
                        </div>

                        <div className='mt-2'>
                            <div className='flex items-end gap-3'>
                                <div className='flex flex-col gap-5'>
                                    <p className='text-lg'>Quantity</p>
                                    <div className='flex w-[130px] p-3 bg-gray-100 text-lg items-center justify-between'>
                                        <button className='btn p-2 rounded-full cursor-pointer' onClick={decrease}>
                                            {count > 1 && <FiMinus />}
                                        </button>
                                        <span>{count}</span>
                                        <button className='btn p-2 rounded-full  cursor-pointer' onClick={increase}><GoPlus /></button>
                                    </div>
                                </div>
                                <button className='border wish cursor-pointer border-gray-200 text-center w-full p-3'>
                                    Add to Wishlist
                                </button>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <button className='text-white wish cursor-pointer font-semibold bg-blue-500 w-full p-3'>
                                Add to Cart
                            </button>
                        </div>

                        <hr className='my-5 border-[0.25px] border-gray-100 w-full' />

                        <div className='mt-4'>
                            <div className='flex flex-col gap-2'>
                                <p>Category: <span className='text-gray-500'>{productItem.category}</span></p>
                                <p>Brand: <span className='text-gray-500'>{productItem.brand}</span></p>
                            </div>

                            <div className='p-7 w-full mt-2 bg-gray-100 rounded-lg shadow-sm'>
                                <p className='text-sm font-medium text-gray-600 mb-1'>Guaranteed safe</p>
                                <p className='text-sm font-medium text-gray-600'> & secure checkout</p>
                                <div className='flex items-center space-x-4 mt-3'>
                                    <img src={paypalImg} alt="paypal" className='h-6' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toggle Buttons */}
            <div className='flex justify-center font-semibold gap-16'>
                <button
                    className={`text-xl cursor-pointer ${activeTab === 'features' ? 'text-black' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('features')}
                >
                    Features
                </button>
                <button
                    className={`text-xl cursor-pointer ${activeTab === 'reviews' ? 'text-black' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Reviews
                </button>
            </div>

            <hr className='my-5 border-[0.25px] border-gray-100 w-[85%] mx-auto' />

            {/* Conditional Render for Reviews */}
            {activeTab === 'reviews' && (
                <div className='grid xl:grid-cols-2 grid-cols-1 gap-10'>
                    <div className='text-center'>
                        <p className='text-xl'>No Review on this product yet</p>
                    </div>
                    <div>
                        <form>
                            <h1 className='text-2xl font-semibold mb-4'>Review This Product</h1>
                            <label htmlFor="rate" className='block mb-2 text-sm font-medium text-gray-700'>Your Rating (1 - 5)</label>
                            <select
                                name='rate'
                                id='rate'
                                className='w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
                                <option value="">Rate 1 to 5</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>

                            <div className='w-full my-4'>
                                <label htmlFor="review" className='block mb-2 text-sm font-medium text-gray-700'>Your Review</label>
                                <textarea
                                    id="review"
                                    placeholder="Write your review here..."
                                    className='w-full h-40 border border-gray-200 p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>

                            <div className='mt-5'>
                                <button type="submit" className='p-2.5 bg-black text-white w-[170px]'>
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detail;
