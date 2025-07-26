import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './contact.css';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { IoLogoInstagram, IoLogoTwitter } from 'react-icons/io';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon1 from '../assets/contact-icon-1.png';
import icon2 from '../assets/contact-icon-2.png';
import icon3 from '../assets/contact-icon-3.png';
import { CartContext } from '../Contexts/Context';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { CiLocationOn } from 'react-icons/ci';

const Contact = () => {
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.solarticity.com";

  const { data } = useContext(CartContext);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const getUserToken = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser)?.value?.token : null;
  };
  const token = getUserToken();

  useEffect(() => {
    if (data) {
      setFormData(prev => ({
        ...prev,
        name: data.name || '',
        email: data.email || '',
        phone: data.phone || '',
      }));
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (!formData.subject.trim() || !formData.message.trim()) {
      toast.warn("Please fill in subject and message.");
      setLoader(false);
      return;
    }

    try {
      const resp = await axios.post(`${VITE_API_BASE_URL}/send`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (resp.data.success === true) {
        toast.success(resp.data?.msg);
        setFormData(prev => ({
          ...prev,
          subject: '',
          message: ''
        }));
      } else {
        toast.error(resp.data?.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || error?.response?.data?.msg || "An error occurred");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className='pt-24'>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Contact Us | Solarticity | Nigeria's Premier Solar Marketplace</title>
        <meta
          name="description"
          content="Contact Solarticity Nigeria for solar energy inquiries, support, or partnerships. Reach us via phone, email, or visit our office in Abuja."
        />
        <meta
          name="keywords"
          content="contact solar company Nigeria, solar energy support, solarticity contact, solar inquiries Abuja, renewable energy partners Nigeria"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Contact Solarticity - Nigeria's Leading Solar Marketplace" />
        <meta
          property="og:description"
          content="Get in touch with Solarticity for quality solar panels, inverters, and batteries in Nigeria."
        />
      </Helmet>

      {/* Header */}
      <div className='flex pb-10 items-center justify-center p-3 flex-col'>
        <h1 className='xl:text-5xl text-2xl font-semibold'>Keep In Touch With Us</h1>
        <div className='flex items-center gap-2 text-md text-gray-600'>
          <Link to='/' className='texts'>Home</Link>
          <li className='list-none'><span className='text-md'>•</span> Contact</li>
        </div>
      </div>

      {/* Contact Section */}
      <div className='w-[85%] max-w-7xl mx-auto bg-white shadow-sm p-10 items-center flex flex-col lg:flex-row gap-10'>
        {/* Left: Form */}
        <div className='w-full lg:w-[70%]'>
          <form className='mt-5' onSubmit={handleSubmit}>
            <h1 className='text-3xl font-semibold mb-6'>Send A Message</h1>
            {[
              { label: "Your Name", type: "text", name: "name", placeholder: "John Doe" },
              { label: "Your Email", type: "email", name: "email", placeholder: "example@gmail.com" },
              { label: "Your Phone Number", type: "number", name: "phone", placeholder: "Enter phone number" },
              { label: "Subject", type: "text", name: "subject", placeholder: "Write your subject" }
            ].map((field, idx) => {
              const isReadOnly = ['name', 'email', 'phone'].includes(field.name);
              return (
                <div key={idx} className='w-full mb-4'>
                  <label htmlFor={field.name} className='block mb-2 text-sm font-medium text-gray-700'>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    value={formData[field.name]}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                    readOnly={isReadOnly}
                    className={`w-full border border-gray-200 text-md p-3 rounded-sm focus:outline-none focus:ring-2 ${isReadOnly
                      ? 'text-gray-400 bg-gray-100 cursor-not-allowed focus:ring-gray-200'
                      : 'text-gray-700 focus:ring-blue-500'
                      }`}
                  />
                </div>
              );
            })}

            {/* Message */}
            <div className='w-full mb-4'>
              <label htmlFor="message" className='block mb-2 text-sm font-medium text-gray-700'>Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                className='w-full h-40 border border-gray-200 p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='mt-5'>
              <button
                type="submit"
                className="p-2.5 button cursor-pointer bg-black text-white w-[170px] flex items-center justify-center"
                disabled={loader}
              >
                {loader && (
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                {loader ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className='w-full lg:w-[30%] space-y-10 text-gray-700'>
          <div className='flex flex-col gap-4'>
            <img src={icon1} alt="email" className='w-[70px]' />
            <div className='text-sm'>
              <p className='text-sm text-[#011627] font-medium mb-1'>info@solarticity.com</p>
              <p className='text-[#011627] font-bold text-lg'>+234 916 865 2676</p>
            </div>
          </div>

          <div className='flex gap-4 flex-col items-start'>
            <img src={icon2} alt="location" className='w-[70px]' />
            <a
              href="https://www.google.com/maps/place/Aco+Phase+Two,+Lugbe,+Abuja,+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className='text-gray-400 flex items-start gap-2 text-md texts font-semibold mt-3 cursor-pointer'>
                Aco Phase Two,<br />
                Lugbe, Abuja,<br /> Nigeria
              </li>
            </a>
          </div>

          <div className='flex gap-4 flex-col items-start'>
            <img src={icon3} alt="social" className='w-[70px]' />
            <div>
              <p className='text-sm text-[#011627] mb-2'>Find us on social media</p>
              <div className='mt-5 flex cursor-pointer items-center gap-3'>
                {[
                  { icon: <FaFacebookF />, label: 'Facebook' },
                  { icon: <IoLogoInstagram />, label: 'Instagram' },
                  { icon: <IoLogoTwitter />, label: 'Twitter' },
                  { icon: <FaLinkedinIn />, label: 'LinkedIn' }
                ].map((item, index) => (
                  <Link key={index} to="#" title={item.label} aria-label={item.label}>
                    <div className='bg-white shadow changes p-2 w-[40px] flex items-center justify-center rounded-md'>
                      {item.icon}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className='w-[85%] max-w-7xl mx-auto mt-10'>
        <h2 className='text-2xl font-semibold mb-4'>Our Location</h2>
        <div className='h-[400px] w-full rounded-md overflow-hidden shadow'>
          <MapContainer center={[9.0023, 7.3896]} zoom={15} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={[9.0023, 7.3896]}>
              <Tooltip permanent direction="top" offset={[0, -10]}>
                Solarticity Headquarters
              </Tooltip>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Contact;