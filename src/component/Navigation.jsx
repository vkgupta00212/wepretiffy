import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import GetUser from "../backend/authentication/getuser";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const phone = localStorage.getItem("userPhone");
  const [user, setUser] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleDash = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const fetchedUser = await GetUser(phone);
        console.log("Fetched from the Navigation ", { fetchedUser });
        setUser(fetchedUser || []);
      } catch (error) {
        console.error("Error fetching user:", error);
        setMessage("Failed to load user. Please try again later.");
      }
    };
    fetchuser();
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[80px]">
          {/* Logo */}
          <div
            onClick={handleDash}
            className="flex flex-col cursor-pointer group"
          >
            <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
              wepretiffy
            </span>
            <span className="text-sm md:text-base font-medium text-gray-600 mt-1 group-hover:text-indigo-600 transition-colors duration-300">
              Be the best version of you
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10 text-lg font-medium">
            {[
              { href: "/", label: "Home" },
              { href: "/course", label: "Course" },
              { href: "/skinanalyzer", label: "Skin Analyzer" },
              { href: "#products", label: "Products" },
              { href: "#services", label: "Services" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-gray-700 hover:text-indigo-600 transition-colors duration-300 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {isLoggedIn ? (
              /* Profile Dropdown */
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center space-x-3 cursor-pointer select-none group"
                  onClick={() => setOpen(!open)}
                >
                  <img
                    src={
                      user[0]?.Image
                        ? `https://weprettify.com/images/${user[0].Image}`
                        : "https://via.placeholder.com/150?text=Avatar"
                    }
                    alt={user[0]?.Fullname || "Profile"}
                    className="w-11 h-11 rounded-full border-2 border-gray-200 group-hover:border-indigo-400 transition-all duration-300"
                  />

                  <span className="text-base font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                    {user[0]?.Fullname || ""}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition-all duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Dropdown Menu */}
                {open && (
                  <div className="absolute right-0 mt-3 bg-white shadow-xl rounded-xl w-56 z-50 text-sm border border-gray-100 transform transition-all duration-300 scale-95 origin-top-right animate-in">
                    {[
                      { href: "/userprofile", label: "My Profile" },
                      {
                        label: "Logout",
                        className: "text-red-500",
                        onClick: handleLogout,
                      },
                    ].map((item) => (
                      <a
                        key={item.label}
                        href={item.href || "#"}
                        onClick={item.onClick || null}
                        className={`block px-5 py-3 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 ${
                          item.className || "text-gray-700"
                        } first:rounded-t-xl last:rounded-b-xl`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Login Button */
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
