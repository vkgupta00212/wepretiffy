import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false); // for dropdown
  const dropdownRef = useRef(null); // dropdown ref
  const navigate = useNavigate();

  const handleDash = () => {
    navigate("/");
  };

  // Scroll listener to toggle navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false); // Scrolling down
      } else {
        setShowNavbar(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } bg-background/80 backdrop-blur-lg border-b border-border`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[70px]">
          {/* Logo */}
          <div onClick={handleDash} className="flex flex-col cursor-pointer">
            <span className="text-[28px] md:text-[35px] font-semibold text-black">
              wepretiffy
            </span>
            <span className="text-[13px] md:text-[16px] font-normal mt-[-5px] text-black">
              Be the best version of you
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-[20px] relative">
            <a
              href="#home"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#products"
              className="text-foreground hover:text-primary transition-colors"
            >
              Products
            </a>
            <a
              href="#services"
              className="text-foreground hover:text-primary transition-colors"
            >
              Services
            </a>

            {/* Avatar Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center space-x-2 cursor-pointer select-none"
                onClick={() => setOpen(!open)}
              >
                <img
                  src="https://i.pravatar.cc/150?img=3"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
                <span className="text-[16px] font-normal text-foreground">
                  My Profile
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Dropdown Menu */}
              {open && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 z-50 text-sm">
                  <a
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 text-black"
                  >
                    My Profile
                  </a>
                  <a
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 text-black"
                  >
                    Settings
                  </a>
                  <a
                    href="/logout"
                    className="block px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
