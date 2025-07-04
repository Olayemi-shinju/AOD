import { useContext, useEffect, useState } from 'react';
import SecondNav from './SecondNav';
import { FiShoppingCart } from "react-icons/fi";
import { BsHeart } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import Modal from '../modal/Modal';
import { CartContext } from '../Contexts/Context';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo.png';

const NavBar = () => {
  const { openCartModal, data, wishlist, cartData } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.value && parsed.expiry > Date.now()) {
          setLocalUser(parsed.value);
        } else {
          localStorage.removeItem('user');
        }
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <div>
      <div className='lg:px-14 lg:py-6 w-full flex justify-between items-center'>
        <div className='flex-col w-[10%] leading-2 text-blue-700 hidden lg:flex xl:flex'>
          <Link to='/'>
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className='flex w-full bg-white shadow p-5 justify-between items-center lg:hidden xl:hidden'>
          <Link to='/'>
            <div>
              <img src={logo} alt="" className='w-[120px]' />
            </div>
          </Link>

          <div className='w-[60%] hidden xs:block sm:block md:block xl:block'>
            <div className='flex items-center justify-between border-blue-600 border-[2px] w-full'>
              <input type="text" placeholder='Search for product or brands...' className='text-gray-600 w-[490px] outline-none text-sm p-3' />
              <button className='bg-blue-600 px-5 py-2 cursor-pointer text-center text-white font-extrabold'>
                <CiSearch className='text-3xl' />
              </button>
            </div>
          </div>

          <div className='flex items-center gap-9'>
            <div className='flex items-center gap-7 lg:hidden xl:hidden'>
              <div className='flex items-start'>
                <div className='border-[1.5px] absolute top-[35px] ml-4 border-white rounded-full h-[20px] w-[20px] flex items-center justify-center bg-black'>
                  <p className='text-white text-xs'>{cartData.totalItems}</p>
                </div>
                <FiShoppingCart className='relative text-2xl cursor-pointer logo' onClick={openCartModal} />
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={handleOpen} className='font-bold cursor-pointer' width="30" height="16" viewBox="0 0 30 16">
              <rect x="10" width="20" height="2" fill="currentColor"></rect>
              <rect x="5" y="7" width="25" height="2" fill="currentColor"></rect>
              <rect x="10" y="14" width="20" height="2" fill="currentColor"></rect>
            </svg>
          </div>
        </div>

        <div className='w-[50%] hidden xl:block lg:block'>
          <div className='flex items-center justify-between border-blue-600 border-[2px] w-full'>
            <input type="text" placeholder='Search for product or brands...' className='text-gray-600 w-[490px] outline-none text-sm p-3' />
            <button className='bg-blue-600 px-5 py-2 cursor-pointer text-center text-white font-extrabold'>
              <CiSearch className='text-3xl' />
            </button>
          </div>
        </div>

        <div className='lg:flex xl:flex items-center gap-14 hidden'>
          {!localStorage.getItem('user') ? (
            <Link to='/login'>
              <div className='flex items-center gap-2'>
                <div className='flex items-center justify-center w-[45px] h-[45px] rounded-full border-[2px] border-gray-500 opacity-70'>
                  <IoPersonOutline className='text-bold text-2xl' />
                </div>
                <div>
                  <p className='text-gray-500 font-semibold text-sm'>Hello, Sign in</p>
                  <p className='text-black text-sm'>Guest user</p>
                </div>
              </div>
            </Link>
          ) : (
            <Link to='/profile'>
              <div className='flex items-center gap-2'>
                <div className='flex items-center justify-center w-[45px] h-[45px] rounded-full border-[2px] border-gray-500 opacity-70'>
                  <IoPersonOutline className='text-bold text-2xl' />
                </div>
                <div>
                  <p className='text-gray-500 text-sm'>Hello,</p>
                  <p className='text-black font-semibold text-sm'>{data?.name}</p>
                </div>
              </div>
            </Link>
          )}

          <div className='flex items-center gap-7'>
            <Link to={localUser ? '/wish' : '/login'} className='relative'>
              <BsHeart className='text-2xl cursor-pointer logo' />
              {wishlist?.length > 0 && (
                <div className='absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                  {wishlist.length}
                </div>
              )}
            </Link>

            <div className='flex items-start relative'>
           
                <div className='absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                  {cartData?.totalItems}
                </div>
              <FiShoppingCart className='text-2xl cursor-pointer logo' onClick={openCartModal} />
            </div>

          </div>
        </div>
      </div>

      <SecondNav />
      {open && <Modal open={open} handleClose={handleClose} />}
    </div>
  );
};

export default NavBar;
