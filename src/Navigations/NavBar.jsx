import { useContext, useEffect, useState } from 'react';
import SecondNav from './SecondNav';
import { FiShoppingCart } from "react-icons/fi";
import { BsHeart } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import Modal from '../modal/Modal';
import { CartContext } from '../Contexts/Context';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import axios from 'axios';

const NavBar = () => {
  const { openCartModal, wishlist, cartData, data } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [localUser, setLocalUser] = useState(null);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const handleNavigate = (slug) => {
    navigate(`/detail/${slug}`)
    setSearch('')
  }


  // Fetch all products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resp = await axios.get(`${VITE_API_BASE_URL}/get-all-product`);
        if (resp.data.success === true) {
          setProduct(resp.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProduct();
  }, []);

  // Filter products based on search input
  useEffect(() => {
    if (search.trim() === '') {
      setFilteredProducts([]);
      return;
    }
    const results = product.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(results);
  }, [search, product]);

  // Sync user from localStorage
  const syncLocalUser = () => {
    const stored = localStorage.getItem('user');

    if (!stored) {
      setLocalUser(null);
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      if (parsed?.value && parsed?.expiry && parsed.expiry > Date.now()) {
        setLocalUser(parsed.value);
      } else {
        localStorage.removeItem('user');
        setLocalUser(null);
      }
    } catch (e) {
      localStorage.removeItem('user');
      setLocalUser(null);
    }
  };

  useEffect(() => {
    syncLocalUser();
    window.syncLocalUser = syncLocalUser;
    return () => {
      delete window.syncLocalUser;
    };
  }, []);

  return (
    <div>
      <div className='px-4 py-4 lg:px-14 lg:py-6 w-full flex justify-between items-center'>

        {/* Logo */}
        <div className='w-[120px]'>
          <Link to='/'>
            <img src={logo} alt="Logo" className='w-full object-contain' />
          </Link>
        </div>

        {/* Search Bar */}
        <div className='hidden lg:block w-[50%] relative'>
          <div className='flex items-center justify-between border-blue-600 border-2 w-full'>
            <input
              type="text"
              placeholder='Search for product or brands...'
              className='text-gray-600 w-full outline-none text-sm p-3'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className='bg-blue-600 px-5 py-2 text-white'>
              <CiSearch className='text-3xl' />
            </button>
          </div>

          {filteredProducts.length > 0 && (
            <div className='absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-10 max-h-[300px] overflow-y-auto'>
              {filteredProducts.map((item, index) => (
                <div className="flex items-center p-2 gap-4" onClick={()=>handleNavigate(item.slug)}>
                  <div className="w-[10%]">
                    <img src={item.images[0]} alt="" className="object-contain rounded-xl" />
                  </div>
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-100 cursor-pointer"
                
                  >
                    <h3 className="text-md font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                    <p className="text-sm text-gray-600 truncate">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User, Wishlist, Cart */}
        <div className='flex items-center gap-7'>

          {/* User Info */}
          <div className='hidden lg:flex items-center gap-2'>
            <Link to={localUser ? '/profile' : '/login'} className='flex items-center gap-2'>
              <div className='flex items-center justify-center w-[45px] h-[45px] rounded-full border-2 border-gray-500 opacity-70'>
                <IoPersonOutline className='text-2xl' />
              </div>
              <div className='flex flex-col'>
                <p className={`text-sm ${localUser ? 'text-blue-600' : 'text-gray-500'}`}>
                  {localUser ? `Hello, ${localUser.name || data.name}` : 'Welcome Guest'}
                </p>
                <p className={`text-sm font-semibold ${localUser ? 'text-black' : 'text-gray-700'}`}>
                  {localUser ? 'View Profile' : 'Sign in'}
                </p>
              </div>
            </Link>
          </div>

          {/* Wishlist */}
          <Link to={localUser ? '/wish' : '/login'} className='relative'>
            <BsHeart className='text-2xl cursor-pointer' />
            {wishlist?.length > 0 && (
              <div className='absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                {wishlist.length}
              </div>
            )}
          </Link>

          {/* Cart */}
          <div className='relative cursor-pointer' onClick={openCartModal}>
            <FiShoppingCart className='text-2xl' />
            {
              cartData?.totalItems > 0 && (

                <div className='absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                  {cartData?.totalItems}
                </div>
              )
            }
          </div>
        </div>
      </div>

      {/* Second Nav */}
      <SecondNav />

      {/* Modal */}
      {open && <Modal open={open} handleClose={() => setOpen(false)} />}
    </div>
  );
};

export default NavBar;
