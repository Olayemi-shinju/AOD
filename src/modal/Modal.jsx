import { useRef, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import './modal.css'
import '../Navigations/SecondNav.css'
import logo from '../assets/Logo.png'
import axios from "axios";

const Modal = ({ open, handleClose }) => {
    const modalRef = useRef(null);

    const [opens, setOpen] = useState(true)
    const [categories, setCategories] = useState([])
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const resp = await axios.get(`${VITE_API_BASE_URL}/get-category`);
                if (resp.data.success) {
                    setCategories(resp.data.data);
                } else {
                    setCategories([]);
                }
            } catch (error) {
                console.log(error);
                setCategories([]);
            }
        };

        fetchCategory();
    }, []);

    const handleOpen = () => {
        setOpen(prev => !prev)
    }

    useEffect(() => {
        if (open) {
            modalRef.current.classList.add("modal-open");
        } else {
            modalRef.current.classList.remove("modal-open");
        }
    }, [open]);

    return (
        <>
            {open && (
                <div
                    className={`fixed inset-0 bg-black/40 cursor-crosshair z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={handleClose}
                />
            )}
            <div
                ref={modalRef}
                className={`fixed top-0 scroll-smooth no-scrollbar overflow-y-auto right-0 h-screen w-[75%] lg:w-[30%] md:w-[45%] sm:w-[55%]  bg-white z-50 p-2 modal ${open ? "modal-open" : ""
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between w-[100%] px-2 pt-4">
                    <div className=' lg:flex xl:flex'>
                        <img src={logo} alt="" className="w-[80px]" />
                    </div>
                    <div
                        className="bg-gray-200 cursor-pointer  w-[30px] h-[30px] flex items-center justify-center font-bold text-lg"
                        onClick={handleClose}
                    >
                        <MdOutlineClose className="rotate" />
                    </div>
                </div>
                <div className='px-7 py-4 w-[full] bg-blue-600 catHover cursor-pointer mt-8' onClick={handleOpen}>
                    <div className='flex items-center justify-between' >
                        <div className='flex items-center gap-2'>
                            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1ZM0 7C0 6.44772 0.447715 6 1 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H1C0.447715 8 0 7.55228 0 7ZM1 12C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H11C11.5523 14 12 13.5523 12 13C12 12.4477 11.5523 12 11 12H1Z" fill="currentColor" color='white'></path></svg>
                            <p className='text-white font-semibold text-sm'>All Categories</p>
                        </div>
                        <IoIosArrowDown className='text-white font-bold text-sm' />
                    </div>
                </div>
                <div className={`${opens ? 'hidden' : 'bg-white px-7 py-4 w-[260px] absolute z-10'}`}>
                    {
                        categories?.map((e) => (
                            <Link to={`/shop/${e.slug}`} onClick={handleClose}>
                                <div>
                                    <p className='text-gray-600 font-semibold text-md text cursor-pointer'>{e.name}</p>
                                    <hr className='w-[full] border-[0.15px] border-gray-100 my-3' />
                                </div>
                            </Link>
                        ))
                    }


                </div>

                <div className='p-4 mt-4 lg:hidden xl:hidden'>
                    <ul>
                        <div className='flex mt-2 flex-col gap-4'>
                            <Link to='/'><li className='text-sm texts' onClick={handleClose}>Home</li></Link>
                            <hr className='w-[full] border-[0.1px] border-gray-100 my-3' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Link to='/categories'> <li className='text-sm texts' onClick={handleClose}>Shop</li></Link>
                            <hr className='w-[full] border-[0.1px] border-gray-100 my-3' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Link to='/about'><li className='text-sm texts' onClick={handleClose}>About Us</li></Link>
                            <hr className='w-[full] border-[0.1px] border-gray-100 my-3' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <Link to='/project'><li className='text-sm texts' onClick={handleClose}>Our Project</li></Link>
                            <hr className='w-[full] border-[0.1px] border-gray-100 my-3' />
                        </div>
                    </ul>
                </div>


                <div className='mt-4 lg:mt-10 mb-4'>
                    <Link to='/contact' className='border-[0.1px] border-gray-200 rounded-md p-4 text-sm' onClick={handleClose}>Contact Us</Link>
                </div>
            </div>
        </>
    );
};

export default Modal;






