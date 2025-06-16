import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Solar Panel 300W',
      price: 50000,
      quantity: 1,
      image: 'https://www.ecofluxng.com/assets/solar-panel-GPuY3f3R.png',
    },
    {
      id: 2,
      name: '12V Inverter Battery',
      price: 35000,
      quantity: 2,
      image: 'https://www.ecofluxng.com/assets/battery-D53YAMSd.png',
    },
  ]);

  const handleIncrease = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleRemove = (id) => {
    const confirm = window.confirm("Are you sure you want to remove this item?");
    if (confirm) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className='lg:px-20 px-6 py-10'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-4xl font-semibold'>Shopping Cart</h1>
        <div className='text-sm text-gray-400 mt-2 flex gap-2'>
          <Link to='/'>Home</Link>
          <li className='list-disc'>Shopping Cart</li>
        </div>
      </div>

      {/* Main Layout */}
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Product List */}
        <div className='flex-1 max-h-[550px] overflow-y-auto pr-2 custom-scroll space-y-6'>
          {cartItems.length === 0 ? (
            <p className='text-gray-500'>Your cart is currently empty.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className='flex flex-col sm:flex-row items-center justify-between bg-white shadow rounded-lg p-4'>
                <div className='flex items-center gap-4'>
                  <img src={item.image} alt={item.name} className='w-24 h-24 object-contain' />
                  <div>
                    <h2 className='text-lg font-semibold'>{item.name}</h2>
                    <p className='text-gray-500'>₦{item.price.toLocaleString()}</p>
                    
                    {/* Quantity Controls */}
                    <div className='flex items-center gap-2 mt-2'>
                      <button
                        onClick={() => handleDecrease(item.id)}
                        disabled={item.quantity === 1}
                        className={`w-8 h-8 flex items-center justify-center rounded-full border text-lg ${
                          item.quantity === 1
                            ? 'text-gray-300 border-gray-300 cursor-not-allowed'
                            : 'text-black border-gray-400 hover:bg-gray-200'
                        }`}
                      >-</button>
                      <span className='w-6 text-center'>{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.id)}
                        className='w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 text-black hover:bg-gray-200'
                      >+</button>

                      {/* 🗑 Remove */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className='ml-4 text-red-500 hover:underline text-sm'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <p className='text-lg font-semibold mt-4 sm:mt-0'>
                  ₦{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Checkout Summary */}
        <div className='w-full lg:w-1/3 bg-white shadow rounded-lg p-6 h-fit'>
          <h2 className='text-2xl font-semibold mb-6'>Order Summary</h2>
          <div className='flex justify-between text-lg font-semibold mb-4'>
            <span>Subtotal</span>
            <span className='font-semibold'>₦{total.toLocaleString()}</span>
          </div>
          <button className='w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition'>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
