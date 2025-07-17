import { useEffect, useState } from 'react'
import './SecondNav.css'
import { Link } from 'react-router-dom'
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios';

const SecondNav = () => {
    const [open, setOpen] = useState(true)
    const [categories, setCategories] = useState([]);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleOpen = () => {
        setOpen(prev => !prev)
    }

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
    return (
        <div className='hidden md:block xl:block lg:block'>
            <hr className='w-[100%] border-[0.25px] border-gray-200' />
            <div className='px-14 '>
                <div className='flex items-center gap-10'>
                    <div className='p-4 w-[260px] bg-blue-600 catHover cursor-pointer ' onClick={handleOpen}>
                        <div className='flex items-center justify-between' >
                            <div className='flex items-center gap-2'>
                                <svg width="18" height="14" viewBox="0 0 18 14" fillRule="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M0 1C0 0.447715 0.447715 0 1 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H1C0.447715 2 0 1.55228 0 1ZM0 7C0 6.44772 0.447715 6 1 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H1C0.447715 8 0 7.55228 0 7ZM1 12C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H11C11.5523 14 12 13.5523 12 13C12 12.4477 11.5523 12 11 12H1Z" fill="currentColor" color='white'></path></svg>
                                <p className='text-white font-semibold text-sm'>All Categories</p>
                            </div>
                            <IoIosArrowDown className='text-white font-bold text-sm' />
                        </div>
                    </div>
                    <div>
                        <ul className='flex items-center text-black text-sm font-semibold gap-5'>
                            <Link to='/' className='texts'>Home</Link>
                            <Link to='/categories' className='texts'>Shop</Link>
                            <Link to='/about' className='texts'>About us</Link>
                            <Link to='/project' className='texts'>Our Project</Link>
                            <Link to='/contact' className='texts'>Contact</Link>
                        </ul>
                    </div>
                </div>
                <div className={`${open ? 'hidden' : 'bg-white px-7 py-4 w-[260px] absolute z-10'}`}>
                    {
                        categories?.map((e) => (
                            <Link key={e._id} to={`/shop/${e.slug}`}>
                                <div>
                                    <p className='text-gray-600 font-semibold text-md text cursor-pointer'>{e.name}</p>
                                    <hr className='w-[full] border-[0.15px] border-gray-100 my-3' />
                                </div>
                            </Link>
                        ))
                    }


                </div>
            </div>

        </div>
    )
}

export default SecondNav