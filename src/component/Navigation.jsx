import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../component/ui/button";
import { Menu, X, Calendar } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const handleDash = () => {
    navigate("/");
  };

  // Scroll listener to toggle navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } bg-background/80 backdrop-blur-lg border-b border-border`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={handleDash}
            className="flex flex-col hover:cursor-pointer"
          >
            <span className="text-[28px] md:text-[35px] font-semibold text-black">
              wepretiffy
            </span>
            <span className="text-[13px] md:text-[16px] font-normal mt-[-5px] text-black">
              Be the best version of you
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-[20px]">
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
            <a
              href="#testimonials"
              className="text-foreground hover:text-primary transition-colors"
            >
              Reviews
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {["#home", "#products", "#services", "#testimonials"].map(
              (href, i) => (
                <a
                  key={i}
                  href={href}
                  className="block py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
                </a>
              )
            )}
            <div className="pt-4 border-t border-border">
              <Button variant="default" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
