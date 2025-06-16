import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Category.css';
import { FiShoppingCart } from 'react-icons/fi';
import { GrView } from 'react-icons/gr';
import { BsHeart } from 'react-icons/bs';
import { motion } from "framer-motion";

const Shop = () => {
  const [sortType, setSortType] = useState('');
  const [imageLoaded, setImageLoaded] = useState({});

  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  const product = [
    {
      id: 1,
      image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14',
      name: 'Alpha Solar Panel',
      descp: ' The SMK 11kVA Hybrid Inverter is a robust and scalable energy solution designed for both residential and commercial applications...',
      title: 'solar/img',
      price: '100000',
    },
    {
      id: 2,
      image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14',
      name: 'Gamma Solar Panel',
      descp: ' The SMK 11kVA Hybrid Inverter is a robust and scalable energy solution designed for both residential and commercial applications...',
      title: 'solar/img',
      price: '200000',
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

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const sortedProducts = [...product].sort((a, b) => {
    const priceA = Number(a.price.replace(/,/g, ''));
    const priceB = Number(b.price.replace(/,/g, ''));
    if (sortType === 'low-high') return priceA - priceB;
    if (sortType === 'high-low') return priceB - priceA;
    if (sortType === 'a-z') return a.name.localeCompare(b.name);
    if (sortType === 'z-a') return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <div className='lg:px-20 px-7 pt-18'>
      <div>
        <h1 className='text-4xl font-semibold'>Solar Panels</h1>
        <div className='text-sm text-gray-400 mt-2 flex gap-2'>
          <Link to='/'>Home</Link>
          <li className='list-disc'>Solar Panels</li>
        </div>
      </div>

      <div className='lg:flex md:flex md:justify-between lg:items-center p-2 py-16 lg:justify-end gap-6'>
        <select
          value={sortType}
          onChange={handleSortChange}
          className='border-[0.1px] lg:w-[180px] mt-3 w-full text-gray-700 p-2 text-lg border-gray-500 rounded-md'
        >
          <option value="">Default Sorting</option>
          <option value="low-high">Price Low To High</option>
          <option value="high-low">Price High To Low</option>
          <option value="a-z">Alphabetics: A - Z</option>
          <option value="z-a">Alphabetics: Z - A</option>
        </select>

        <button type="button" className="flex mt-3 cursor-pointer w-full text-center justify-center items-center outline text bg-black p-3 text-white lg:w-[150px]">
          <span>
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.9998 3.45001H10.7998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M3.8 3.45001H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M6.5999 5.9C7.953 5.9 9.0499 4.8031 9.0499 3.45C9.0499 2.0969 7.953 1 6.5999 1C5.2468 1 4.1499 2.0969 4.1499 3.45C4.1499 4.8031 5.2468 5.9 6.5999 5.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M15.0002 11.15H12.2002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M5.2 11.15H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M9.4002 13.6C10.7533 13.6 11.8502 12.5031 11.8502 11.15C11.8502 9.79691 10.7533 8.70001 9.4002 8.70001C8.0471 8.70001 6.9502 9.79691 6.9502 11.15C6.9502 12.5031 8.0471 13.6 9.4002 13.6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </span>
          Filter
        </button>
      </div>


      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className='grid py-10 lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 2xl:grid-cols-4 grid-cols-1'>
          {sortedProducts.map((e, index) => (
            <div key={index} className='p-4'>
              <div className='flex relative flex-col gap-4 cursor-pointer product-card'>
                <div className='absolute top-2 right-2 z-10 bg-white change p-2 h-[40px] w-[40px] rounded-full flex items-center justify-center icon'>
                  <FiShoppingCart />
                </div>
                <div className='absolute top-12 right-2 z-10 bg-white change p-2 h-[40px] w-[40px] rounded-full flex items-center justify-center icon delay-1'>
                  <GrView />
                </div>
                <div className='absolute top-20 right-2 z-10 bg-white change p-2 h-[40px] w-[40px] rounded-full flex items-center justify-center icon delay-2'>
                  <BsHeart />
                </div>
                <Link to={`/detail/${e.id}`}>
                  <div className='w-full h-[250px] bg-gray-100 bg-opacity-50 flex justify-center items-center relative'>
                    {!imageLoaded[e.id] && (
                      <div className='absolute inset-0 flex justify-center items-center'>
                        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
                      </div>
                    )}
                    <img
                      src={e.image}
                      alt={e.title}
                      className={`w-full h-full object-cover ${!imageLoaded[e.id] ? 'invisible' : ''}`}
                      onLoad={() => handleImageLoad(e.id)}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </Link>



                <div>
                  <p className='text-xl'>{e.name}</p>
                  <p className='font-semibold'>₦{Number(e.price).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </motion.div>
    </div>
  );
};

export default Shop;
