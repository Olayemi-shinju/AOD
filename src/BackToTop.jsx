import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-18 cursor-pointer right-6 z-50 p-4 rounded-full shadow-md bg-blue-600 text-white hover:bg-blue-700 transition-opacity ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      aria-label="Back to top"
      title="Back to top"
    >
      <FaArrowUp className="w-4 h-4" />
    </button>

  );
}
