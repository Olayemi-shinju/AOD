import React from 'react'
import { Link } from 'react-router-dom'
import './contact.css'
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa'
import { IoLogoInstagram, IoLogoTwitter } from 'react-icons/io'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const Contact = () => {
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
                    <form className='mt-5'>
                        <h1 className='text-3xl font-semibold mb-6'>Send A Message</h1>
                        {[
                            { label: "Your Name", type: "text", name: "name", placeholder: "John Doe" },
                            { label: "Your Email", type: "email", name: "email", placeholder: "example@gmail.com" },
                            { label: "Your Phone Number", type: "number", name: "number", placeholder: "Enter phone number" },
                            { label: "Subject", type: "text", name: "subject", placeholder: "Write your subject" }
                        ].map((field, idx) => (
                            <div key={idx} className='w-full mb-4'>
                                <label htmlFor={field.name} className='block mb-2 text-sm font-medium text-gray-700'>{field.label}</label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    id={field.name}
                                    placeholder={field.placeholder}
                                    className='w-full border border-gray-200 p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                        ))}
                        <div className='w-full mb-4'>
                            <label htmlFor="message" className='block mb-2 text-sm font-medium text-gray-700'>Your Message</label>
                            <textarea
                                id="message"
                                placeholder="Write your message here..."
                                className='w-full h-40 border border-gray-200 p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div className='mt-5'>
                            <button type="submit" className='p-2.5 button cursor-pointer bg-black text-white w-[170px]'>Send Message</button>
                        </div>
                    </form>
                </div>

                {/* Right: Contact Info */}
                <div className='w-full lg:w-[30%] space-y-10 text-gray-700'>
                    {/* Email & Phone */}
                    <div className='flex flex-col gap-4'>
                        <img src="https://www.ecofluxng.com/assets/img/contact/contact-icon-1.png" alt="email" className='w-[70px]' />
                        <div className='text-sm'>
                            <p className='text-sm text-[#011627] font-medium mb-1'>info@ecofluxng.com</p>
                            <p className='text-[#011627] font-bold text-lg'>+234 916 865 2676</p>
                        </div>
                    </div>

                    {/* Address */}
                    <div className='flex gap-4 flex-col items-start'>
                        <img src="https://www.ecofluxng.com/assets/img/contact/contact-icon-2.png" alt="location" className='w-[70px]' />
                        <p className='text-sm text-[#011627] leading-6'>
                            Aco Estate Phase Two,<br />
                            Lugbe, Abuja<br />
                            900107
                        </p>
                    </div>

                    {/* Social Media */}
                    <div className='flex gap-4 flex-col items-start'>
                        <img src="https://www.ecofluxng.com/assets/img/contact/contact-icon-3.png" alt="social" className='w-[70px]' />
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
