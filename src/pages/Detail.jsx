import { useContext, useEffect, useState } from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import './detail.css';
import paypalImg from '../assets/images/paypal.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CartContext } from '../Contexts/Context';

function formatTimeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

const Detail = () => {
  const {addToWishlist, addToCart}= useContext(CartContext)
  const { slug } = useParams();
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [review, setReviews] = useState([]);
  const [related, setRelated] = useState([]);
  const get = JSON.parse(localStorage.getItem('user'));
  const token = get?.value?.token;
  const [formData, setFormData] = useState({
    rating: '',
    review: '',
    slug: slug
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const increase = () => setCount(prev => prev < product.quantity ? prev + 1 : prev);
  const decrease = () => setCount(prev => prev > 1 ? prev - 1 : 1);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      setLoading(true);
      try {
        const resp = await axios.get(`http://localhost:7000/api/v1/get-single-product/${slug}`);
        if (resp.data.success) {
          const prod = resp.data.data;
          setProduct(prod);
          setSelectedImageIndex(0);

          const allResp = await axios.get('http://localhost:7000/api/v1/get-all-product');
          if (allResp.data.success) {
            setRelated(
              allResp.data.data
                .filter(p => p.category === prod.category && p.slug !== slug)
                .slice(0, 4)
            );
          }
        } else {
          setProduct({});
        }
      } catch (err) {
        console.error(err);
        setProduct({});
      } finally {
        setLoading(false);
      }
    };
    fetchSingleProduct();
  }, [slug]);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const resp = await axios.get(`http://localhost:7000/api/v1/get-product-review/${slug}`);
        if (resp.data.success) setReviews(resp.data.data);
        else setReviews([]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReview();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    try {
      if (!formData.rating || !formData.review) {
        setError('Please fill the fields');
        setReviewLoading(false);
        return;
      }
      const resp = await axios.post('http://localhost:7000/api/v1/create-review', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resp.data.success) {
        toast.success(resp.data.msg);
        setReviews(prev => [...prev, resp.data.data]);
        setFormData({ rating: '', review: '' });
        setError('');
      } else {
        toast.error(resp.data.msg);
      }
    } catch (err) {
      console.error(err);
      setFormData({ rating: '', review: '' });
      toast.error(err?.response?.data?.message || err?.response?.data?.msg || 'Something went wrong');
    } finally {
      setReviewLoading(false);
    }
  };

  const images = product.images || [];
  const hasUserReviewed = review.some(r => r.user._id === get?.value?.user?._id);

  return (
    <div className='xl:px-10 p-2 xl:py-10'>
      {/* Breadcrumb */}
      <div className='xl:flex px-4 gap-2 items-center'>
        <div className='text-gray-400 text-md flex items-center'>
          <AiOutlineHome className='text-lg' />
          <Link to='/'>Home</Link>
        </div>
        <div className='text-md'>
          <p><span className='text-gray-400'>•</span> {product.name}</p>
        </div>
      </div>

      {/* Main Section */}
      <div className='flex flex-col lg:flex-row gap-6 p-5 min-h-[900px]'>
        {/* Left Images */}
        <div className='lg:w-[70%] relative'>
          <div className={`sticky top-0 flex gap-4 ${loading ? 'blur-sm pointer-events-none select-none opacity-70' : ''}`}>
            <div className='flex flex-col gap-2 w-[15%]'>
              {images.length > 0 ? images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`thumb-${i}`}
                  className={`w-full h-auto border rounded-sm object-cover cursor-pointer ${i === selectedImageIndex ? 'border-blue-500 border-2' : 'border-gray-300'}`}
                  onClick={() => setSelectedImageIndex(i)}
                />
              )) : (
                <div className='w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400'>
                  No Images Available
                </div>
              )}
            </div>
            <div className='w-[85%]'>
              {images.length > 0 ? (
                <img src={images[selectedImageIndex]} alt='main' className='w-[100%] rounded-sm object-cover' />
              ) : (
                <div className='w-[90%] h-[400px] bg-gray-200 flex items-center justify-center text-gray-400'>
                  No Images Available
                </div>
              )}
            </div>
          </div>
          {loading && (
            <div className='absolute inset-0 bg-white bg-opacity-60 flex justify-center items-center rounded-md z-10'>
              <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
              </svg>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className='lg:w-[60%]'>
          <div className='flex flex-col bg-white'>
            <h2 className='text-sm text-gray-500 mb-2'>{product.brand}</h2>
            <p className='text-2xl lg:text-3xl font-semibold text-gray-800 leading-snug'>{product.name}</p>
            <div className='bg-gray-200 mt-3 w-[80px] text-center'>
              <span className='text-blue-500 text-sm font-semibold'>In Stock</span>
            </div>
            <div className='mt-5'>
              <p className='text-sm text-gray-700 leading-7'>{product.description}</p>
            </div>
            <div className='py-3'>
              <p className='text-2xl font-semibold'>₦{parseInt(product.price).toLocaleString()}.00</p>
            </div>
            <div className='mt-2'>
              <div className='flex items-end gap-3'>
                <div className='flex flex-col gap-5'>
                  <p className='text-lg'>Quantity</p>
                  <div className='flex w-[130px] p-3 bg-gray-100 text-lg items-center justify-between'>
                    <button className='btn p-2 rounded-full cursor-pointer' onClick={decrease} disabled={count <= 1}><FiMinus /></button>
                    <span>{count}</span>
                    <button className='btn p-2 rounded-full cursor-pointer' onClick={increase}><GoPlus /></button>
                  </div>
                </div>
                <button onClick={()=>addToWishlist(product._id)} className='border wish cursor-pointer border-gray-200 text-center w-full p-3'>Add to Wishlist</button>
              </div>
            </div>
            <div className='mt-4'>
              <button onClick={()=>addToCart(product._id, count)} className='text-white wish cursor-pointer font-semibold bg-blue-500 w-full p-3'>Add to Cart</button>
            </div>
            <hr className='my-5 border-[0.25px] border-gray-100 w-full' />
            <div className='mt-4'>
              <div className='p-7 w-full mt-2 bg-gray-100 rounded-lg shadow-sm'>
                <p className='text-sm font-medium text-gray-600 mb-1'>Guaranteed safe</p>
                <p className='text-sm font-medium text-gray-600'> & secure checkout</p>
                <div className='flex items-center space-x-4 mt-3'>
                  <img src={paypalImg} alt="paypal" className='h-6' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className='my-5 border-[0.25px] border-gray-100 w-[85%] mx-auto' />

      {/* Reviews Section */}
      <h1 className='text-2xl font-semibold text-center py-7 mb-4'>Review This Product</h1>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-10'>
        <div className="border border-gray-200 rounded-md bg-white shadow-sm max-h-[400px] overflow-y-auto pr-2 scroll-smooth">
          <div className="grid grid-cols-1 gap-3 p-4">
            {review.length === 0 ? (
              <p className="text-center text-gray-500 text-sm">No reviews yet. Be the first to leave one!</p>
            ) : (
              review.map(reviewItem => {
                const timeAgo = formatTimeAgo(new Date(reviewItem.createdAt));
                const rating = Math.min(Math.max(parseInt(reviewItem.rating), 1), 5);
                return (
                  <div key={reviewItem._id} className="border border-gray-100 p-4 rounded-md bg-white shadow">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-800">{reviewItem.user.name}</h3>
                      <p className="text-xs text-gray-500">{timeAgo}</p>
                    </div>
                    <div className="flex items-center text-yellow-500 text-sm mb-1">
                      {[...Array(5)].map((_, i) => (<span key={i}>{i < rating ? '★' : '☆'}</span>))}
                      <span className="ml-2 text-gray-500 text-xs">({rating}/5)</span>
                    </div>
                    <p className="mt-1 text-gray-700 text-sm">{reviewItem.review}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            {hasUserReviewed && (
              <p className="text-sm text-blue-600 font-medium mb-4">You have already reviewed this product.</p>
            )}
            {!hasUserReviewed && (
              <>
                <label htmlFor="rate" className='block mb-2 text-sm font-medium text-gray-700'>Your Rating (1 - 5)</label>
                <select name='rating' id='rate' onChange={handleChange} value={formData.rating} className='w-full border border-gray-200 text-md text-gray-400 p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
                  <option value="">Rate 1 to 5</option>
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>

                <div className='w-full my-4'>
                  <label htmlFor="review" className='block mb-2 text-sm font-medium text-gray-700'>Your Review</label>
                  <textarea id="review" name='review' onChange={handleChange} value={formData.review} placeholder="Write your review here..." className='w-full h-40 border border-gray-200 p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500' />
                </div>

                {error && <p className='text-sm text-red-500 mb-3'>{error}</p>}

                <div className='mt-5'>
                  <button type="submit" disabled={reviewLoading} className={`flex items-center cursor-pointer justify-center gap-2 p-2.5 w-[170px] text-white font-medium rounded ${reviewLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}>
                    {reviewLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
                    ) : 'Send Review'}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(rp => (
              <Link key={rp._id} to={`/product/${rp.slug}`} className="bg-white p-3 border rounded-md hover:shadow">
                <img src={rp.images?.[0]} alt={rp.name} className="w-full h-32 object-cover mb-2 rounded-sm" />
                <p className="text-sm font-medium text-gray-800">{rp.name}</p>
                <p className="text-gray-600">₦{parseInt(rp.price).toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
