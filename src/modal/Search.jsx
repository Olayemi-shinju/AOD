export const Search = ({ onClose }) => {
  // Prevent clicks inside the search box from closing the overlay
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0">
      {/* Overlay that closes on click */}
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>

      {/* Search Bar Area */}
      <div
        className="absolute top-0 left-0 w-full p-6 bg-white shadow-lg"
        onClick={handleContentClick} // Prevents propagation
      >
        <div className="flex items-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search product, brand"
            className="text-gray-500 mx-auto p-4 w-full border outline-none rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
