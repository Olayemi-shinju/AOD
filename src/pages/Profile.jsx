import React, { useState } from 'react';
import { FaUserPen } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const getTabClass = (tab) => (
    `flex p-4 cursor-pointer text-sm font-semibold items-center gap-3 
    ${activeTab === tab ? 'bg-gray-100 text-blue-500' : 'text-gray-600'}`
  );

  return (
    <div className='xl:px-18 px-8 py-5'>
      <div className='w-full xl:flex mt-12 items-start gap-10'>
        {/* Sidebar */}
        <div className='bg-white xl:w-[45%] mt-4 shadow'>
          <div onClick={() => setActiveTab('profile')} className={getTabClass('profile')}>
            <FaUserPen />
            <p>Profile</p>
          </div>
          <div onClick={() => setActiveTab('info')} className={getTabClass('info')}>
            <IoIosInformationCircleOutline />
            <p>Information</p>
          </div>
          <div onClick={() => setActiveTab('orders')} className={getTabClass('orders')}>
            <FaBorderAll />
            <p>My Orders</p>
          </div>
        </div>

        {/* Profile Section */}
        {activeTab === 'profile' && (
          <div className='xl:w-full mt-4 p-4 bg-white shadow'>
            <div className='md:flex items-center justify-between'>
              <p className='text-2xl font-bold mt-4'>Welcome,</p>
              <div className='mt-4'>
                <button className='p-3 cursor-pointer wish text-xm font-semibold border-[0.1px] border-gray-100'>
                  Logout
                </button>
              </div>
            </div>
            <div className='mt-8 xl:flex gap-5 items-center'>
              {/* Orders icon */}
              <div className='p-3 flex cursor-pointer flex-col justify-center items-center gap-3'>
              <svg enable-background="new 0 0 512 512" className='w-[70px]' viewBox="0 0 512 512"><path d="m334.52 286.41c3.21 3.21 3.21 8.42 0 11.63l-71.73 71.73c-1.48 2.16-3.97 3.59-6.79 3.59-.03 0-.07 0-.1 0s-.07 0-.1 0c-2.11 0-4.21-.8-5.82-2.41l-72.5-72.5c-3.21-3.21-3.21-8.42 0-11.63s8.42-3.21 11.63 0l58.66 58.66v-198.62c0-4.54 3.68-8.23 8.23-8.23 4.54 0 8.23 3.68 8.23 8.23v198.21l58.66-58.66c3.21-3.21 8.42-3.21 11.63 0zm117.29-226.22c39.34 38.21 58.47 100.39 60.19 195.66v.3c-1.72 95.28-20.85 157.46-60.19 195.66-38.21 39.34-100.39 58.47-195.66 60.19-.05 0-.1 0-.15 0s-.1 0-.15 0c-95.28-1.72-157.46-20.85-195.66-60.19-39.34-38.21-58.47-100.38-60.19-195.66 0-.1 0-.2 0-.3 1.72-95.28 20.85-157.46 60.19-195.66 38.21-39.34 100.39-58.47 195.66-60.19h.3c95.27 1.72 157.45 20.85 195.66 60.19zm43.73 195.81c-1.65-90.63-19.22-149.13-55.28-184.09-.06-.06-.12-.12-.18-.18-34.95-36.06-93.45-53.62-184.08-55.27-90.63 1.65-149.13 19.22-184.09 55.28-.06.06-.12.12-.18.18-36.06 34.95-53.62 93.44-55.27 184.08 1.65 90.63 19.22 149.13 55.28 184.09l.18.18c34.95 36.06 93.45 53.62 184.09 55.28 90.63-1.65 149.13-19.22 184.09-55.28l.18-.18c36.04-34.96 53.61-93.45 55.26-184.09z"></path></svg>
                <p className='text-md font-semibold'>Orders</p>
              </div>

              {/* Wishlist icon */}
              <div className='p-3 cursor-pointer flex flex-col justify-center items-center gap-3'>
              <svg viewBox="0 -20 480 480" className='w-[70px]' xmlns="http://www.w3.org/2000/svg"><path d="m348 0c-43 .0664062-83.28125 21.039062-108 56.222656-24.71875-35.183594-65-56.1562498-108-56.222656-70.320312 0-132 65.425781-132 140 0 72.679688 41.039062 147.535156 118.6875 216.480469 35.976562 31.882812 75.441406 59.597656 117.640625 82.625 2.304687 1.1875 5.039063 1.1875 7.34375 0 42.183594-23.027344 81.636719-50.746094 117.601563-82.625 77.6875-68.945313 118.726562-143.800781 118.726562-216.480469 0-74.574219-61.679688-140-132-140zm-108 422.902344c-29.382812-16.214844-224-129.496094-224-282.902344 0-66.054688 54.199219-124 116-124 41.867188.074219 80.460938 22.660156 101.03125 59.128906 1.539062 2.351563 4.160156 3.765625 6.96875 3.765625s5.429688-1.414062 6.96875-3.765625c20.570312-36.46875 59.164062-59.054687 101.03125-59.128906 61.800781 0 116 57.945312 116 124 0 153.40625-194.617188 266.6875-224 282.902344zm0 0"></path></svg>
                <p className='text-md font-semibold'>Wishlist</p>
              </div>
            </div>
          </div>
        )}

        {/* Information Section */}
        {activeTab === 'info' && (
          <div className='xl:w-full mt-4 p-8 mb-9 bg-white shadow'>
            <form>
              <p className='text-xl font-bold'>Personal Details</p>

              <div className='xl:flex items-center gap-3 w-full'>
                <div className='focus-within:border-blue-500 border-gray-200 w-full mt-4 border-[0.1px] p-3 flex items-center gap-4'>
                  <span>👤</span>
                  <input type="text" placeholder='Full Name' className='text-sm p-2 outline-none w-full text-gray-400' />
                </div>
                <div className='focus-within:border-blue-500 border-gray-200 w-full mt-4 border-[0.1px] p-3 flex items-center gap-4'>
                  <span>📧</span>
                  <input type="text" placeholder='Email address' className='text-sm p-2 outline-none w-full text-gray-400' />
                </div>
              </div>

              <div className='focus-within:border-blue-500 border-gray-200 xl:w-[50%] mt-4 border-[0.1px] p-3 flex items-center gap-4'>
                <span>📱</span>
                <input type="text" placeholder='Phone Number' className='outline-none p-2 w-full text-sm text-gray-400' />
              </div>

              <div className='focus-within:border-blue-500 border-gray-200 xl:w-full mt-4 border-[0.1px] p-3 flex items-center gap-4'>
                <span>🏠</span>
                <input type="text" placeholder='Street Address' className='text-sm p-2 outline-none w-full text-gray-400' />
              </div>

              <div className='focus-within:border-blue-500 border-gray-200 xl:w-full mt-4 border-[0.1px] p-3 flex items-center gap-4'>
                <span className='w-4'>📍</span>
                <input type="text" placeholder='Landmark (Optional)' className='outline-none p-2 w-full text-gray-400 text-sm' />
              </div>

              <div className='mt-5'>
                <button className='p-4 w-[200px] profile-btn border text-white text-md cursor-pointer text-center bg-black'>
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Orders Section */}
        {activeTab === 'orders' && (
          <div className='xl:w-full mt-4 p-8 mb-9 bg-white shadow'>
            <p className='text-center font-semibold text-lg'>No Orders Yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
