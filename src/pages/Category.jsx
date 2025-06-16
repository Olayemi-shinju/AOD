import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Solar Panels',
    image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14', // Replace with your own image or uploaded path
    title: '/products/solar-panels',
  },
  {
    id: 2,
    name: 'Inverters',
    image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14',
    title: '/products/inverters',
  },
  {
    id: 3,
    name: 'Batteries',
    image: 'https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1734709519279images.jpg?alt=media&token=99ec8c12-a51e-4909-a998-5ee7ab8dad14',
    title: '/products/batteries',
  },
];

const Categories = () => {
  return (
    <div className="px-6 lg:px-20 pt-20">
      <h1 className="text-4xl font-bold mb-2">Categories</h1>
      <div className="text-sm text-gray-500 mb-10 flex gap-2">
        <Link to="/">Home</Link>
        <span className="text-gray-400">•</span>
        <span>Categories</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           {
            categories?.map((e)=>(
                <div className='bg-gray-200 p-5'>
                <div>
                    <img src={e.image} alt={e.title} className='w-[100%] py-4'/>
                </div>
                <Link to='/shop' >
                    <div className='bg-white p-3 text-center'>
                    <p className='text-center font-semibold text-2xl'>{e.name}</p>
                    </div>
                </Link>
            </div>
            ))
           }
      </div>
    </div>
  );
};

export default Categories;
