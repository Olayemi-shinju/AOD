import { useState, useEffect, useContext } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { TfiTruck } from "react-icons/tfi";
import { LuDollarSign } from "react-icons/lu";
import { PiSealPercent } from "react-icons/pi";
import { LuHeadphones } from "react-icons/lu";
import '../App.css'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { FiShoppingCart } from 'react-icons/fi';
import { GrView } from 'react-icons/gr';
import { BsHeart } from 'react-icons/bs';
import axios from 'axios';
import { CartContext } from '../Contexts/Context';

const Home = () => {
  const { addToWishlist, addToCart } = useContext(CartContext)
  const [imageLoaded, setImageLoaded] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([])
  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  const limit = 16

  // slider begin function
  const slides = [
    {
      bgColor: 'bg-[#e3edf6]',
      content: (
        <div className="flex flex-col lg:flex-row items-center justify-between xl:w-[83%] w-full mx-auto px-4 h-auto lg:h-[450px] py-20">
          <div className="text-[#021d35] text-center lg:text-left mb-6 lg:mb-0">
            <p className="text-lg">Battery Collection Program</p>
            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold">Recycle and Save</h1>
            <p className="text-xl lg:text-2xl font-serif mt-4">Return your used batteries and get exclusive offers</p>
          </div>
          <img
            src="https://www.ecofluxng.com/assets/battery-re-CPLhSbyl.png"
            alt="Battery recycling"
            className="w-full max-w-[400px] lg:max-w-[450px]"
          />
        </div>
      )
    },
    {
      bgColor: 'bg-[#e3edf6] opacity-90',
      content: (
        <div className="flex flex-col lg:flex-row items-center justify-between xl:w-[83%] w-full mx-auto px-4 h-auto lg:h-[450px] py-20">
          <div className="text-black w-full text-center lg:text-left lg:w-1/2 mb-6 lg:mb-0">
            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold">
              Africa's Number One Solar Marketplace
            </h1>
            <p className="text-xl lg:text-2xl font-serif mt-4">
              Go solar, <span className="text-[#a3ca47]">Go green</span>
            </p>
          </div>
          <img
            src="https://www.ecofluxng.com/assets/africa-3lfmcgl1.png"
            alt="Solar marketplace"
            className="w-full max-w-[400px] lg:max-w-[450px]"
          />
        </div>
      )
    },
    {
      bgColor: 'bg-[#e3edf6]',
      content: (
        <div className="flex flex-col lg:flex-row items-center justify-between xl:w-[87.5%] w-full mx-auto px-4 h-auto lg:h-[450px] py-20">
          <div className="text-center lg:text-left mb-10 lg:mb-0">
            <p className="text-lg">Energy <strong>Calculator</strong></p>
            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Unsure of your home's solar needs?
            </h1>
            <Link to="/energy-calculator">
              <p className="text-xl lg:text-2xl font-serif mt-4">
                Try our AI-powered <span className="text-[#f8d03b]">Energy Calculator</span>
              </p>
            </Link>
          </div>
          <img
            src="https://www.ecofluxng.com/assets/calculator-D9rNbQO-.png"
            alt="Energy calculator"
            className="w-full max-w-[400px] lg:max-w-[450px]"
          />
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentSlide]);

  // Fetch products on page load
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:7000/api/v1/get-all-product?limit=${limit}`
        );
        if (resp.data.success) {
          setProducts(resp.data.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  // Filter functions
  const getTrendingProducts = () => products.filter(p => p.isTrending === true)
  const getNewArrivalProducts = () => products.filter(p => p.isNewArrival === true)

  return (
    <>
      <section className="relative">
        <div className={`${slides[currentSlide].bgColor} transition-colors duration-500`}>
          {slides[currentSlide].content}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 text-white hover:text-black top-1/2 transform -translate-y-1/2 bg-[#00000000] hover:bg-white p-4 rounded-full border-1 border-white duration-200 transition"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 text-white hover:text-black top-1/2 transform -translate-y-1/2 bg-[#00000000] hover:bg-white p-4 rounded-full border-1 border-white duration-200 transition"
          aria-label="Next slide"
        >
          <FaChevronRight className="" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-300'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* second section */}
      <section className="w-[91%] max-w-screen-xl mx-auto mt-10 px-4">
        {/* Icons Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-items-center">
          <div className="bg-[#e5f2ff] flex justify-center items-center rounded-full h-32 w-32">
            <img
              src="https://www.ecofluxng.com/assets/solar-panel-GPuY3f3R.png"
              className="w-20 hover transition rounded-2xl"
              alt="Solar Panel"
            />
          </div>
          <div className="bg-[#e5f2ff] flex justify-center items-center rounded-full h-32 w-32">
            <img
              src="https://www.ecofluxng.com/assets/inverter-BTBEUzZF.png"
              className="w-20 hover"
              alt="Inverter"
            />
          </div>
          <div className="bg-[#e5f2ff] flex justify-center items-center rounded-full h-32 w-32">
            <img
              src="https://www.ecofluxng.com/assets/battery-D53YAMSd.png"
              className="w-20 hover"
              alt="Battery"
            />
          </div>
          <div className="bg-[#e5f2ff] flex justify-center items-center rounded-full h-32 w-32">
            <img
              src="https://www.ecofluxng.com/assets/charge-VHi5Fj5i.png"
              className="w-25 hover"
              alt="Charge Controller"
            />
          </div>
          <div className="bg-[#e5f2ff] flex justify-center items-center rounded-full h-32 w-32 md:flex">
            <img
              src="https://www.ecofluxng.com/assets/ecoflux-house-GU4vyDCf.png"
              className="w-24 hover"
              alt="Ecoflux House"
            />
          </div>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          <div className="text-blue-400 flex items-center gap-4 py-5 px-4 bg-[#f6f7f9] rounded-lg sm:rounded-l-lg">
            <TfiTruck className="text-3xl" />
            <div className="text-black">
              <h2 className="text-sm font-bold">We offer installation</h2>
              <p className="text-gray-700 text-xs font-light">On items.</p>
            </div>
          </div>
          <div className="text-blue-400 flex items-center gap-4 py-5 px-4 bg-[#f6f7f9] rounded-lg">
            <LuDollarSign className="text-3xl" />
            <div className="text-black">
              <h2 className="text-sm font-bold">Return & Refund</h2>
              <p className="text-gray-700 text-xs font-light">Money back guarantee</p>
            </div>
          </div>
          <div className="text-blue-400 flex items-center gap-4 py-5 px-4 bg-[#f6f7f9] rounded-lg">
            <PiSealPercent className="text-3xl" />
            <div className="text-black">
              <h2 className="text-sm font-bold">Warranty</h2>
              <p className="text-gray-700 text-xs font-light">On products</p>
            </div>
          </div>
          <div className="text-blue-400 flex items-center gap-4 py-5 px-4 bg-[#f6f7f9] rounded-lg sm:rounded-r-lg">
            <LuHeadphones className="text-3xl" />
            <div className="text-black">
              <h2 className="text-sm font-bold">Support 24/7</h2>
              <p className="text-gray-700 text-xs font-light">Contact us anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* products trending */}
      {getTrendingProducts().length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          {/* Heading */}
          <p className='text-3xl font-bold px-18 pt-18 pb-2 text-gray-800'>
            Trending Products
          </p>

          <div className='grid py-4 px-14 gap-3 lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 2xl:grid-cols-4 grid-cols-1'>
            {getTrendingProducts().map((e, index) => (
              <div key={index} className='p-4 border border-gray-100 rounded-lg'>
                <div className='flex relative flex-col gap-4 cursor-pointer product-card'>
                  <div
                    onClick={() => addToCart(e._id, 1)}
                    className='absolute top-2 right-2 z-10 bg-white change p-2 h-[40px] w-[40px] rounded-full flex items-center justify-center icon cursor-pointer'
                  >
                    <FiShoppingCart />
                  </div>

                  <div className='absolute top-12 right-2 z-10 bg-white change p-2 h-[40px] w-[40px] rounded-full flex items-center justify-center icon delay-1'>
                    <GrView />
                  </div>
                  <div onClick={() => addToWishlist(e._id)} className='absolute top-20 right-2 z-10 bg-white change p-2 h-[40px] w-[40px] rounded-full flex items-center justify-center icon delay-2'>
                    <BsHeart />
                  </div>
                  <Link to={`/detail/${e.slug}`}>
                    <div className='w-full h-[250px] bg-gray-100 bg-opacity-50 flex justify-center items-center relative'>
                      {!imageLoaded[e.id] && (
                        <div className='absolute inset-0 flex justify-center items-center'>
                          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
                        </div>
                      )}
                      <img
                        src={e.images[0]}
                        alt={e.title}
                        className={`w-full h-full object-cover ${!imageLoaded[e.id] ? 'invisible' : ''}`}
                        onLoad={() => handleImageLoad(e.id)}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </Link>

                  <div>
                    <p className='text-xl'>{e.name}</p>
                    <p className='font-semibold'>₦{Number(e.price).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* bg for shop */}
      <section className="w-[90%] xl:w-[82%] mx-auto my-10">
        <div className="bg-blue-400 text-white rounded-lg px-6 py-10 md:px-16 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <div>
              <p className="font-semibold text-sm md:text-base">SOLAR SAVINGS SEASON IS HERE</p>
              <h1 className="text-3xl md:text-5xl font-bold pt-5 pb-6 md:pb-10 leading-tight">
                Don't miss out on our incredible offers
              </h1>
              <Link
                to="/categories"
                className="bg-gray-900 text-white font-semibold rounded-lg px-6 py-2.5 text-sm md:text-base"
              >
                Shop now
              </Link>
            </div>
            <div className="w-full flex justify-center md:justify-end">
              <img
                src="https://www.ecofluxng.com/assets/solar-savings-DTC1YK6H.png"
                alt="Solar savings"
                className="w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* new arrivals */}
      {getNewArrivalProducts().length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <p className='text-3xl font-bold px-18 pt-18 pb-2 text-gray-800'>
            New Arrivals
          </p>

          <div className='grid py-4 px-14 gap-3 lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 2xl:grid-cols-4 grid-cols-1'>
            {getNewArrivalProducts().map((e, index) => (
              <div key={index} className='p-4 border border-gray-100 rounded-lg'>
                <div className='flex relative flex-col gap-4 cursor-pointer product-card'>
                  <div
                    onClick={() => addToCart(e._id, 1)}
                    className='absolute top-2 right-2 z-10 bg-white change p-2 h-[40px] w-[40px] rounded-full flex items-center justify-center icon cursor-pointer'
                  >
                    <FiShoppingCart />
                  </div>

                  <div className='absolute top-12 right-2 z-10 bg-white change p-2 h-[40px] w-[40px] rounded-full flex items-center justify-center icon delay-1'>
                    <GrView />
                  </div>
                  <div onClick={() => addToWishlist(e._id)} className='absolute top-20 right-2 z-10 bg-white change p-2 h-[40px] w-[40px] rounded-full flex items-center justify-center icon delay-2'>
                    <BsHeart />
                  </div>
                  <Link to={`/detail/${e.slug}`}>
                    <div className='w-full h-[250px] bg-gray-100 bg-opacity-50 flex justify-center items-center relative'>
                      {!imageLoaded[e.id] && (
                        <div className='absolute inset-0 flex justify-center items-center'>
                          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
                        </div>
                      )}
                      <img
                        src={e.images[0]}
                        alt={e.title}
                        className={`w-full h-full object-cover ${!imageLoaded[e.id] ? 'invisible' : ''}`}
                        onLoad={() => handleImageLoad(e.id)}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </Link>

                  <div>
                    <p className='text-xl'>{e.name}</p>
                    <p className='font-semibold'>₦{Number(e.price).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Home;
