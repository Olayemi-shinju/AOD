import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Contexts/Context";
import { Link } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { Helmet } from "react-helmet-async"; // ✅ Helmet for SEO

const ITEMS_PER_PAGE = 8;

const Project = () => {
  const { data } = useContext(CartContext);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProjects = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await axios.get(`${VITE_API_BASE_URL}/get-project`);
      const fetched = res.data?.data || [];
      setProjects(fetched);
      if (fetched.length === 0) setErrorMsg("No projects found.");
    } catch {
      setErrorMsg("Failed to fetch projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-8">
      <Helmet>
        <title>Featured Projects | My Store</title>
        <meta
          name="description"
          content={`Explore featured projects by ${data?.name || "our community"}. Browse innovative solutions and past works.`}
        />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-1">
            Featured Projects
          </h1>
          <p className="text-gray-500 text-sm">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            &nbsp;/ Projects &nbsp;&bull;&nbsp; {data?.name || "User"}
          </p>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center py-12">
            <ClipLoader size={40} color="#2563EB" />
          </div>
        )}

        {/* Error */}
        {errorMsg && !loading && (
          <div className="text-center text-gray-500 text-sm py-12">{errorMsg}</div>
        )}

        {/* Cards */}
        {!loading && paginatedProjects.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProjects.map((proj) => (
                <div
                  key={proj._id}
                  className="relative bg-white rounded-2xl shadow-sm transition-transform hover:scale-[1.02] overflow-hidden"
                >
                  <div className="group relative h-48 overflow-hidden">
                    <img
                      src={proj.project[0]}
                      alt={proj.name}
                      className="w-full h-full object-contain bg-[#F3F4F6] transition-opacity duration-300 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-20 transition duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                      {proj.name}
                    </h2>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-10 gap-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  currentPage === 1
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-blue-600 border-blue-300 hover:bg-blue-50"
                }`}
              >
                Previous
              </button>

              <span className="text-gray-600 text-sm">
                Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
              </span>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  currentPage === totalPages
                    ? "text-gray-400 border-gray-300 cursor-not-allowed"
                    : "text-blue-600 border-blue-300 hover:bg-blue-50"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Project;
