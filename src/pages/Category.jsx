import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // ✅ Import Helmet

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div className="px-6 lg:px-20 pt-20">
      {/* ✅ Helmet for SEO */}
      <Helmet>
        <title>Product Categories | Solar Products Nigeria</title>
        <meta
          name="description"
          content="Browse solar product categories including panels, inverters, batteries, and more from vendors across Nigeria and Africa."
        />
        <meta
          name="keywords"
          content="solar categories Nigeria, inverter category, battery section, solar product types, solar electronics Lagos"
        />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <h1 className="text-4xl font-bold mb-2">Categories</h1>
      <div className="text-sm text-gray-500 mb-10 flex gap-2">
        <Link to="/">Home</Link>
        <span className="text-gray-400">•</span>
        <span>Categories</span>
      </div>

      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((e) => (
            <div key={e._id} className="bg-gray-200 p-5">
              <Link to={`/shop/${e.slug}`}>
                <div>
                  <img src={e.image} alt={e.title} className="w-full py-4" />
                </div>
              </Link>
              <div className="bg-white p-3 text-center">
                <p className="text-center font-semibold cursor-default text-2xl">{e.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
