import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Category.css';
import { FiShoppingCart } from 'react-icons/fi';
import { GrView } from 'react-icons/gr';
import { BsHeart } from 'react-icons/bs';
import { motion } from "framer-motion";
import axios from 'axios';
import { CartContext } from '../Contexts/Context';
import ProductModal from '../modal/productModal';

const Shop = () => {
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { addToWishlist, addToCart } = useContext(CartContext);
  const [sortType, setSortType] = useState('');
  const [imageLoaded, setImageLoaded] = useState({});
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openProduct, setOpenProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const limit = 20;

  const { id } = useParams();

  const handleImageLoad = (productId) => {
    setImageLoaded((prev) => ({ ...prev, [productId]: true }));
  };

  const handleOpen = () => setOpenProduct(true);
  const handleClose = () => {
    setOpenProduct(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(
          `${VITE_API_BASE_URL}/get-category-product/${id}?page=${page}&limit=${limit}`
        );
        if (resp.data.success) {
          setProduct(resp.data.data);
          setTotalPages(resp.data.pagination.pages);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, page]);

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const sortedProducts = [...product].sort((a, b) => {
    const getPriceValue = (val) =>
      typeof val === 'string' ? Number(val.replace(/,/g, '')) : Number(val) || 0;
    const priceA = getPriceValue(a.price);
    const priceB = getPriceValue(b.price);
    if (sortType === 'low-high') return priceA - priceB;
    if (sortType === 'high-low') return priceB - priceA;
    if (sortType === 'a-z') return a.name.localeCompare(b.name);
    if (sortType === 'z-a') return b.name.localeCompare(a.name);
    return 0;
  });

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className='lg:px-20 px-7 pt-18'>
      <div>
        <h1 className='text-4xl font-semibold'>
          {product.length > 0 && product[0].category?.name}
        </h1>
        {!loading && (
          <div className='text-sm text-gray-400 mt-2 flex gap-2'>
            <Link to='/'>Home</Link>
            <p>•</p>
            <p>{product.length > 0 && product[0].category?.name}</p>
          </div>
        )}
      </div>

      <div className='lg:flex md:flex md:justify-between lg:items-center p-2 py-16 lg:justify-end gap-6'>
        <select
          value={sortType}
          onChange={handleSortChange}
          className='border-[0.1px] lg:w-[180px] mt-3 w-full text-gray-700 p-2 text-lg border-gray-500 rounded-md'
        >
          <option value="">Default Sorting</option>
          <option value="low-high">Price Low To High</option>
          <option value="high-low">Price High To Low</option>
          <option value="a-z">Alphabetics: A - Z</option>
          <option value="z-a">Alphabetics: Z - A</option>
        </select>

        <button
          type="button"
          className="flex mt-3 cursor-pointer w-full text-center justify-center items-center outline text bg-black p-3 text-white lg:w-[150px]"
        >
          {/* Dummy filter button */}
          <span>
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.9998 3.45001H10.7998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3.8 3.45001H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.5999 5.9C7.953 5.9 9.0499 4.8031 9.0499 3.45C9.0499 2.0969 7.953 1 6.5999 1C5.2468 1 4.1499 2.0969 4.1499 3.45C4.1499 4.8031 5.2468 5.9 6.5999 5.9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.0002 11.15H12.2002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.2 11.15H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.4002 13.6C10.7533 13.6 11.8502 12.5031 11.8502 11.15C11.8502 9.79691 10.7533 8.70001 9.4002 8.70001C8.0471 8.70001 6.9502 9.79691 6.9502 11.15C6.9502 12.5031 8.0471 13.6 9.4002 13.6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          Filter
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className='grid py-10 lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 2xl:grid-cols-4 grid-cols-1'>
              {sortedProducts.map((e, index) => (
                <div key={index} className='p-4'>
                  <div className='flex relative flex-col gap-4 cursor-pointer product-card'>
                    {/* Icons */}
                    <div
                      onClick={() => addToCart(e._id, 1)}
                      className='absolute top-2 right-2 z-10 bg-white change p-2 h-[40px] w-[40px] rounded-full flex items-center justify-center icon cursor-pointer'
                    >
                      <FiShoppingCart />
                    </div>

                    <div
                      onClick={() => {
                        setSelectedProduct(e);
                        handleOpen();
                      }}
                      className='absolute top-12 right-2 z-10 bg-white change p-2 h-[40px] w-[40px] rounded-full flex items-center justify-center icon delay-1 cursor-pointer'
                    >
                      <GrView />
                    </div>

                    <div
                      onClick={() => addToWishlist(e._id)}
                      className='absolute top-20 right-2 z-10 bg-white change p-2 h-[40px] w-[40px] rounded-full flex items-center justify-center icon delay-2 cursor-pointer'
                    >
                      <BsHeart />
                    </div>

                    {/* Image */}
                    <Link to={`/detail/${e.slug}`}>
                      <div className='w-full h-[250px] bg-gray-100 bg-opacity-50 flex justify-center items-center relative'>
                        {!imageLoaded[e.id] && (
                          <div className='absolute inset-0 flex justify-center items-center'>
                            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
                          </div>
                        )}
                        <img
                          src={e.images?.[0]}
                          alt={e.name}
                          className={`w-full h-full object-cover ${!imageLoaded[e.id] ? 'invisible' : ''}`}
                          onLoad={() => handleImageLoad(e.id)}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div>
                      <p className='text-xl'>{e.name}</p>
                      <p className='text-sm text-gray-400 truncate' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {e.description}
                      </p>
                      <p className='font-semibold'>₦{Number(e.price).toLocaleString()}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-2 block w-full text-center lg:hidden bg-black text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 py-10">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="px-4 py-2 rounded cursor-pointer bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="flex items-center px-3">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="px-4 py-2 rounded cursor-pointer bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      {openProduct && selectedProduct && (
        <>
          <ProductModal handleClose={handleClose} product={selectedProduct} />
        </>
      )}
    </div>
  );
};

export default Shop;
