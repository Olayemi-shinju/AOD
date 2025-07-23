import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Search = ({ onClose }) => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resp = await axios.get(`${VITE_API_BASE_URL}/get-all-product`);
        if (resp.data.success === true) {
          setProduct(resp.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredProducts([]);
      return;
    }
    const results = product.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(results);
  }, [search, product]);

  // Prevent overlay click from bubbling in search box
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  const handleProductClick = (slug) => {
    navigate(`/detail/${slug}`);
    setSearch('');
    setFilteredProducts([]);
    onClose(); // Close search modal
  };


  return (
    <div className="inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>

      {/* Search Area */}
      <div
        className="absolute top-0 left-0 w-full p-6 bg-white shadow-lg"
        onClick={handleContentClick}
      >
        <div className="flex items-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search product, brand"
            className="text-gray-700 mx-auto p-4 w-full border outline-none rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredProducts.length > 0 && (
          <div className="mt-4 bg-white border rounded-lg shadow max-h-[300px] overflow-y-auto">
            {filteredProducts.map((item, index) => (
              <div className="flex items-center gap-4">
                <div className="w-[20%]">
                  <img src={item.images[0]} alt="" className="object-contain rounded-xl" />
                </div>
                <div
                  key={index}
                  className="p-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleProductClick(item.slug)}
                >
                  <h3 className="text-md font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">Brand: {item.brand}</p>
                  <p className="text-sm text-gray-600 truncate">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
