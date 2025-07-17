import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './contact.css'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { IoLogoInstagram, IoLogoTwitter } from 'react-icons/io'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import icon1 from '../assets/contact-icon-1.png'
import icon2 from '../assets/contact-icon-2.png'
import icon3 from '../assets/contact-icon-3.png'
import { CartContext } from '../Contexts/Context';
import { toast } from 'react-toastify'
import axios from 'axios'

const Contact = () => {
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const { data } = useContext(CartContext)
    const [loader, setLoader] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    })

    useEffect(() => {
        if (data) {
            setFormData(prev => ({
                ...prev,
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || '',
            }))
        }
    }, [data])
    const get = JSON.parse(localStorage.getItem('user'))
    const token = get?.value?.token

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

   const handleSubmit = async (e) => {
    e.preventDefault()
    setLoader(true)
    try {
        const resp = await axios.post(`${VITE_API_BASE_URL}/send`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        if (resp.data.success === true) {
            setLoader(false)
            setFormData(prev => ({
                ...prev,
                subject: '',
                message: ''
            }))
            toast.success(resp.data?.msg)
        } else {
            setLoader(false)
            toast.error(resp.data?.msg)
        }
    } catch (error) {
        setLoader(false)
        console.log(error)
        toast.error(error?.response?.data?.message || error?.response?.data?.msg || "An error occurred")
    }
}

    return (
        <div className='pt-24'>
            {/* Header */}
            <div className='flex pb-10 items-center justify-center p-3 flex-col'>
                <h1 className='xl:text-5xl text-2xl font-semibold'>Keep In Touch With Us</h1>
                <div className='flex items-center gap-2 text-md text-gray-600'>
                    <Link to='/' className='texts'>Home</Link>
                    <li className='list-none'><span className='text-md'>•</span> Contact</li>
                </div>
            </div>

            {/* Contact Section */}
            <div className='w-[85%] mx-auto bg-white shadow-sm p-10 items-center flex flex-col lg:flex-row gap-10'>
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
                            if (field.name === 'email') {
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
                                            className='w-full border border-gray-200 text-gray-400 text-md p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed'
                                            readOnly
                                        />
                                    </div>
                                )
                            }
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
                                        className='w-full border border-gray-200 text-gray-700 text-md p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    />
                                </div>
                            )
                        })}
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
                                {loader ? (
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                ) : null}
                                {loader ? 'Sending...' : 'Send Message'}
                            </button>

                        </div>
                    </form>
                </div>

                {/* Right: Contact Info */}
                <div className='w-full lg:w-[30%] space-y-10 text-gray-700'>
                    {/* Email & Phone */}
                    <div className='flex flex-col gap-4'>
                        <img src={icon1} alt="email" className='w-[70px]' />
                        <div className='text-sm'>
                            <p className='text-sm text-[#011627] font-medium mb-1'>info@ecofluxng.com</p>
                            <p className='text-[#011627] font-bold text-lg'>+234 916 865 2676</p>
                        </div>
                    </div>

                    {/* Address */}
                    <div className='flex gap-4 flex-col items-start'>
                        <img src={icon2} alt="location" className='w-[70px]' />
                        <p className='text-sm text-[#011627] leading-6'>
                            Aco Estate Phase Two,<br />
                            Lugbe, Abuja<br />
                            900107
                        </p>
                    </div>

                    {/* Social Media */}
                    <div className='flex gap-4 flex-col items-start'>
                        <img src={icon3} alt="social" className='w-[70px]' />
                        <div>
                            <p className='text-sm text-[#011627] mb-2'>Find us on social media</p>
                            <div className='mt-5 flex cursor-pointer items-center gap-3'>
                                <Link>
                                    <div className='bg-white changes shadow p-2 w-[40px] flex items-center justify-center rounded-md'>
                                        <FaFacebookF />
                                    </div>
                                </Link>
                                <Link>
                                    <div className='bg-white shadow changes p-2 w-[40px] flex items-center justify-center rounded-md'>
                                        <IoLogoInstagram />
                                    </div>
                                </Link>
                                <Link>
                                    <div className='bg-white shadow changes p-2 w-[40px] flex items-center justify-center rounded-md'>
                                        <IoLogoTwitter />
                                    </div>
                                </Link>
                                <Link>
                                    <div className='bg-white shadow changes p-2 w-[40px] flex items-center justify-center rounded-md'>
                                        <FaLinkedinIn />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className='w-[85%] mx-auto mt-10'>
                <h2 className='text-2xl font-semibold mb-4'>Our Location</h2>
                <div className='h-[400px] w-full rounded-md overflow-hidden shadow'>
                    <MapContainer
                        center={[9.0023, 7.3896]} // Aco Estate, Lugbe
                        zoom={15}
                        scrollWheelZoom={false}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                        <Marker position={[9.0023, 7.3896]}>
                            <Tooltip permanent direction="top" offset={[0, -10]}>
                                Aco, Phase Two, Lugbe
                            </Tooltip>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}

export default Contact
