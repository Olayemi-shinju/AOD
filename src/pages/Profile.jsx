import { useContext, useEffect, useState } from 'react';
import { FaUserPen } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa";
import { CartContext } from '../Contexts/Context';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { IoPersonOutline } from "react-icons/io5";
import { GoMail } from "react-icons/go";
import { FaPhone } from "react-icons/fa6";
import { FaRegAddressCard } from "react-icons/fa";
import { FaLandmark } from "react-icons/fa";
const Profile = () => {
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.solarticity.com";

  const [cancelingOrderId, setCancelingOrderId] = useState(null);
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem('activeTab');
    return savedTab ? savedTab : 'profile';
  });
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  // Save the active tab to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const { user, setData, data, setCart } = useContext(CartContext)
  const [datas, setDatas] = useState({})
  const [orders, setOrders] = useState([])
  const get = JSON.parse(localStorage.getItem('user'))
  const token = get?.value?.token
  // Loader state
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const sendmail = datas.email
  // Initialize formData with empty strings
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    landmark: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user) return;
        const resp = await axios.get(`${VITE_API_BASE_URL}/get-single-user/${user.id}`, {
          headers: {Authorization: `Bearer ${token}`}
        });
        setDatas(resp.data.data);
        setFormData({
          name: resp.data.data.name || '',
          email: resp.data.data.email || '',
          phone: resp.data.data.phone || '',
          street: resp.data.data.street || '',
          landmark: resp.data.data.landmark || ''
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [user?.id]);

  const Loader = () => (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!formData.name && !formData.phone && !formData.street && !formData.landmark) {
        toast.error('Please fill any of the field you want to update')
        return
      }

      setIsLoading(true); // start loader

      const resp = await axios.put(`${VITE_API_BASE_URL}/update-user/${user.id}`, formData, { headers: { Authorization: `Bearer: ${token}` } })
      if (resp.data.success === true) {
        toast.success(resp.data.msg)
        setData(resp?.data?.data)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false); // stop loader
    }
  }

  const getTabClass = (tab) => (
    `flex p-4 cursor-pointer text-sm font-semibold items-center gap-3 
    ${activeTab === tab ? 'bg-gray-100 text-blue-500' : 'text-gray-600'}`
  );

  const handleLogout = async () => {
    try {
      const resp = await axios.post(
        `${VITE_API_BASE_URL}/logout`,
        { email: sendmail },
        { headers: { Authorization: `Bearer: ${token}` } }
      );

      if (resp.data.success === true) {
        setData(resp?.data?.data);
        setCart([])
        // Remove user from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('activeTab');

        // Trigger NavBar to re-sync local user
        if (window.syncLocalUser) window.syncLocalUser();

        toast.success(resp.data.msg);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setIsLoadingOrders(true);
        const resp = await axios.get(`${VITE_API_BASE_URL}/my-orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (resp.data.success === true) {
          setOrders(resp.data.data);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    if (token) {
      fetchOrder();
    }
  }, [token]);

  const handleCanceled = async (_id) => {
    try {
      setCancelingOrderId(_id);
      const resp = await axios.patch(
        `${VITE_API_BASE_URL}/cancel/${_id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (resp.data.success === true) {
        toast.info(resp.data.msg);
        // Update the local state instead of refetching
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === _id ? { ...order, status: 'canceled' } : order
          )
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Failed to cancel order');
    } finally {
      setCancelingOrderId(null);
    }
  };

  return (
    <div className='xl:px-18 px-8 py-5'>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>My Account | Solarticity - Solar Marketplace</title>
        <meta
          name="description"
          content="Manage your Solarticity account, view orders, update profile information, and track your solar product purchases."
        />
        <meta
          name="keywords"
          content="solarticity account, solar orders, profile update, solar marketplace, renewable energy Nigeria"
        />
        <meta property="og:title" content="My Account | Solarticity" />
        <meta property="og:description" content="Manage your Solarticity account and solar product orders" />
      </Helmet>

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
              <p className='text-2xl font-bold mt-4'>Welcome, {data?.name}</p>
              <div className='mt-4'>
                <button onClick={handleLogout} className='p-3 cursor-pointer wish text-xm font-semibold border-[0.1px] border-gray-100'>
                  Logout
                </button>
              </div>
            </div>
            <div className='mt-8 xl:flex gap-5 items-center'>
              {/* Orders icon */}
              <div onClick={() => setActiveTab('orders')} className='p-3 flex cursor-pointer flex-col justify-center items-center gap-3'>
                <svg enable-background="new 0 0 512 512" className='w-[70px]' viewBox="0 0 512 512"><path d="m334.52 286.41c3.21 3.21 3.21 8.42 0 11.63l-71.73 71.73c-1.48 2.16-3.97 3.59-6.79 3.59-.03 0-.07 0-.1 0s-.07 0-.1 0c-2.11 0-4.21-.8-5.82-2.41l-72.5-72.5c-3.21-3.21-3.21-8.42 0-11.63s8.42-3.21 11.63 0l58.66 58.66v-198.62c0-4.54 3.68-8.23 8.23-8.23 4.54 0 8.23 3.68 8.23 8.23v198.21l58.66-58.66c3.21-3.21 8.42-3.21 11.63 0zm117.29-226.22c39.34 38.21 58.47 100.39 60.19 195.66v.3c-1.72 95.28-20.85 157.46-60.19 195.66-38.21 39.34-100.39 58.47-195.66 60.19-.05 0-.1 0-.15 0s-.1 0-.15 0c-95.28-1.72-157.46-20.85-195.66-60.19-39.34-38.21-58.47-100.38-60.19-195.66 0-.1 0-.2 0-.3 1.72-95.28 20.85-157.46 60.19-195.66 38.21-39.34 100.39-58.47 195.66-60.19h.3c95.27 1.72 157.45 20.85 195.66 60.19zm43.73 195.81c-1.65-90.63-19.22-149.13-55.28-184.09-.06-.06-.12-.12-.18-.18-34.95-36.06-93.45-53.62-184.08-55.27-90.63 1.65-149.13 19.22-184.09 55.28-.06.06-.12.12-.18.18-36.06 34.95-53.62 93.44-55.27 184.08 1.65 90.63 19.22 149.13 55.28 184.09l.18.18c34.95 36.06 93.45 53.62 184.09 55.28 90.63-1.65 149.13-19.22 184.09-55.28l.18-.18c36.04-34.96 53.61-93.45 55.26-184.09z"></path></svg>
                <p className='text-md font-semibold'>Orders</p>
              </div>

              {/* Wishlist icon */}
              <Link to='/wish'>
                <div className='p-3 cursor-pointer flex flex-col justify-center items-center gap-3'>
                  <svg viewBox="0 -20 480 480" className='w-[70px]' xmlns="http://www.w3.org/2000/svg"><path d="m348 0c-43 .0664062-83.28125 21.039062-108 56.222656-24.71875-35.183594-65-56.1562498-108-56.222656-70.320312 0-132 65.425781-132 140 0 72.679688 41.039062 147.535156 118.6875 216.480469 35.976562 31.882812 75.441406 59.597656 117.640625 82.625 2.304687 1.1875 5.039063 1.1875 7.34375 0 42.183594-23.027344 81.636719-50.746094 117.601563-82.625 77.6875-68.945313 118.726562-143.800781 118.726562-216.480469 0-74.574219-61.679688-140-132-140zm-108 422.902344c-29.382812-16.214844-224-129.496094-224-282.902344 0-66.054688 54.199219-124 116-124 41.867188.074219 80.460938 22.660156 101.03125 59.128906 1.539062 2.351563 4.160156 3.765625 6.96875 3.765625s5.429688-1.414062 6.96875-3.765625c20.570312-36.46875 59.164062-59.054687 101.03125-59.128906 61.800781 0 116 57.945312 116 124 0 153.40625-194.617188 266.6875-224 282.902344zm0 0"></path></svg>
                  <p className='text-md font-semibold'>Wishlist</p>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Information Section */}
        {activeTab === 'info' && (
          <div className='xl:w-full mt-4 p-8 mb-9 bg-white shadow'>
            <form onSubmit={handleSubmit}>
              <p className='text-xl font-bold'>Personal Details</p>

              <div className='xl:flex items-center gap-3 w-full'>
                <div className='focus-within:border-blue-500 border-gray-200 w-full mt-4 border-[0.1px] p-3 flex items-center gap-4'>
                  <IoPersonOutline/>
                  <input type="text" value={formData.name} name='name' onChange={handleChange} placeholder='Full Name' className='text-sm p-2 outline-none w-full text-gray-400' />
                </div>
                <div className='focus-within:border-blue-500 border-gray-200 w-full mt-4 border-[0.1px] p-3 flex items-center gap-4'>
                  <GoMail/>
                  <input type="email" value={formData.email} placeholder='Email address' className='text-sm p-2 outline-none w-full text-gray-400' />
                </div>
              </div>

              <div className='focus-within:border-blue-500 border-gray-200 xl:w-[50%] mt-4 border-[0.1px] p-3 flex items-center gap-4'>
                <FaPhone/>
                <input type="number" name='phone' value={formData.phone} onChange={handleChange} placeholder='Phone Number' className='outline-none p-2 w-full text-sm text-gray-400' />
              </div>

              <div className='focus-within:border-blue-500 border-gray-200 xl:w-full mt-4 border-[0.1px] p-3 flex items-center gap-4'>
               <FaRegAddressCard/>
                <input type="text" name='street' onChange={handleChange} value={formData.street} placeholder='Street Address' className='text-sm p-2 outline-none w-full text-gray-400' />
              </div>

              <div className='focus-within:border-blue-500 border-gray-200 xl:w-full mt-4 border-[0.1px] p-3 flex items-center gap-4'>
                <FaLandmark/>
                <input type="text" name='landmark' value={formData.landmark} onChange={handleChange} placeholder='Landmark (Optional)' className='outline-none p-2 w-full text-gray-400 text-sm' />
              </div>

              <div className='mt-5'>
                <button
                  className='p-4 w-[200px] profile-btn border text-white text-md cursor-pointer text-center bg-black'
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className='xl:w-full mt-4 p-8 mb-9 bg-white shadow'>
            {isLoadingOrders ? (
              <Loader />
            ) : orders.length === 0 ? (
              <p className='text-center font-semibold text-lg'>No Orders Yet</p>
            ) : (
              <div className='space-y-6'>
                {orders.map((order) => (
                  <div key={order._id} className='border rounded-xl p-4 shadow-sm'>
                    <div className='mb-2 flex justify-between items-center'>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'successful'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                          }`}
                      >
                        {order.status}
                      </span>

                      {/* Show "Canceled" text or Cancel button */}
                      {order.status === 'cancelled' ? (
                        <span className='font-bold text-red-600'>Cancelled</span>
                      ) : order.status !== 'successful' ? (
                        <button
                          onClick={() => handleCanceled(order._id)}
                          disabled={cancelingOrderId === order._id}
                          className='text-sm cursor-pointer text-red-600 border border-red-500 px-3 py-1 rounded hover:bg-red-50 transition flex items-center gap-2'
                        >
                          {cancelingOrderId === order._id ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Cancelling...
                            </>
                          ) : (
                            'Cancell Order'
                          )}
                        </button>
                      ) : null}
                    </div>

                    <p className='text-sm text-gray-600'>
                      <strong>Address:</strong> {order.street}, {order.landmark}, {order.region}
                    </p>

                    <div className='mt-4 space-y-4'>
                      {order.products.map((item) => (
                        <div key={item._id} className='flex items-center gap-4 border-t pt-4'>
                          <Link to={`/detail/${item.product.slug}`}>
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className='w-20 h-20 object-cover rounded'
                            />
                          </Link>
                          <div className='flex-1'>
                            <h4 className='font-semibold text-base'>{item.product.name}</h4>
                            <p className='text-sm text-gray-600'>{item.product.description}</p>
                            <p className='text-sm text-gray-700'>Brand: {item.product.brand}</p>
                            <p className='text-sm text-gray-700'>
                              Quantity: {item.quantity} × ₦{item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className='mt-4 text-right text-sm text-gray-500'>
                      Placed on: {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;