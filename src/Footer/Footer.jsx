import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { IoLogoTwitter } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";

const Footer = () => {
    return (
        <div className='lg:px-14 px-5 shadow py-10 lg:py-28'>
            <div className='grid lg:grid-cols-4 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-15'>
                <div>
                    <div className='flex-col w-[10%] leading-2 text-blue-700'>
                        <h1 className='text-2xl font-bold'>AOD</h1>
                        <p className='text-sm font-extralight'>Solatricity</p>
                    </div>
                    <p className='mt-4 text-lg leading-6'>Online solar marketplace for Africans seeking to meet their energy needs</p>
                    <div className='mt-5 flex cursor-pointer items-center gap-3'>
                        <div className='bg-white shadow p-2 w-[40px] flex items-center justify-center rounded-md'>
                            <Link><FaFacebookF className='text-gray-500' /></Link>
                        </div>
                        <div className='bg-white shadow p-2 w-[40px] flex items-center justify-center rounded-md'>
                            <Link><IoLogoInstagram className='text-gray-500' /></Link>
                        </div>
                        <div className='bg-white shadow p-2 w-[40px] flex items-center justify-center rounded-md'>
                            <Link><IoLogoTwitter className='text-gray-500' /></Link>
                        </div>
                        <div className='bg-white shadow p-2 w-[40px] flex items-center justify-center rounded-md'>
                            <Link><FaLinkedinIn className='text-gray-500' /></Link>
                        </div>

                    </div>
                </div>
                <div>
                    <ul>
                        <h1 className='text-xl font-bold'>My Account</h1>
                        <Link to='/profile'><li className='text-gray-400 text-sm texts font-semibold mt-3 cursor-pointer'>• Track Orders</li></Link>
                        <Link to='/energy-calculator'><li className='text-gray-400 text-sm texts font-semibold mt-3 cursor-pointer'>• Energy Calculator</li></Link>
                        <Link to='/'><li className='text-gray-400 text-sm texts font-semibold mt-3 cursor-pointer'>• Wishlist</li></Link>
                        <Link to='/profile'><li className='text-gray-400 text-sm texts font-semibold mt-3 cursor-pointer'>• My Account</li></Link>

                    </ul>
                </div>
                <div>
                    <ul>
                        <h1 className='text-xl font-bold'>Information</h1>
                        <Link to='/about'><li className='text-gray-400 text-sm texts font-semibold mt-3 cursor-pointer'>• About Us</li></Link>
                        <Link><li className='text-gray-400 text-sm texts font-semibold mt-3 cursor-pointer'>• Privacy Policy</li></Link>
                        <Link><li className='text-gray-400 text-sm texts font-semibold mt-3 cursor-pointer'>• Terms & Conditions</li></Link>
                        <Link><li className='text-gray-400 text-sm texts font-semibold mt-3 cursor-pointer'>• Return Policy</li></Link>
                        <Link to='/contact'><li className='text-gray-400 text-sm texts font-semibold mt-3 cursor-pointer'>• Contact Us</li></Link>


                    </ul>
                </div>
                <div>
                    <ul>
                        <h1 className='text-xl font-bold'>Talk To Us</h1>
                        <li className='text-gray-500 text-sm texts  mt-3 cursor-pointer'>Got Questions? Call us</li>
                        <Link to='tel:+2349135611021'><li className=' text-2xl texts font-bold cursor-pointer'>+234 913 561 1021</li></Link>
                        {/* <h4><a href="tel:+2349168652676">+234 916 865 2676</a></h4> */}
                        <Link to='mailto:a.o.dsolatricity@gmail.com'><li className='flex items-center gap-2 text-gray-400 text-sm texts font-semibold mt-3 cursor-pointer'><CiMail className='text-lg' /> a.o.dsolatricity@gmail.com</li></Link>
                        <Link><li className='text-gray-400 flex items-start gap-2 text-sm texts font-semibold mt-3 cursor-pointer'><CiLocationOn className='text-xl' /> Aco Phase Two,<br></br>
                            Lugbe, Abuja,<br></br> Nigeria</li></Link>

                    </ul>
                </div>
            </div>

            <div>
                <hr className='w-[95%] mt-15 border-[0.25px] border-gray-200' />
                <p className='text-gray-400 font-semibold text-sm mt-2'>© 2025 All Rights Reserved | AOD</p>
            </div>
        </div>
    )
}

export default Footer