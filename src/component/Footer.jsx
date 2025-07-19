import {
  Sparkles,
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "../component/ui/button";
import { Input } from "../component/ui/input";

const Footer = () => {
  return (
    <footer className="bg-[#F5F5F5]-to-br from-primary-soft/30 to-secondary-soft/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex flex-col">
              <span className="text-[35px] font-bold text-black">
                wepretiffy
              </span>
              <span className="text-[16px] font-normal  mt-[-5px] text-black">
                Be the best version of you
              </span>
            </div>

            <div className="mt-4 flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-10 w-10"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Our Services
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-foreground hover:text-black transition-colors"
                >
                  Facial Treatments
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground hover:text-black transition-colors"
                >
                  Massage Therapy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground hover:text-black transition-colors"
                >
                  Skincare Consultation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground hover:text-black transition-colors"
                >
                  Aromatherapy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground hover:text-black transition-colors"
                >
                  Wellness Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Product Lines
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-foreground hover:text-black transition-colors"
                >
                  Luxury Serums
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground hover:text-black transition-colors"
                >
                  Premium Creams
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground hover:text-black transition-colors"
                >
                  Cleansing Solutions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground hover:text-black transition-colors"
                >
                  Face Masks
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground hover:text-black transition-colors"
                >
                  Gift Sets
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-black mb-4">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
                <span className="text-black">
                  123 Beauty Boulevard
                  <br />
                  Wellness District, CA 90210
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-black" />
                <span className="text-black">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-black" />
                <span className="text-black">hello@wepretiffy.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-black">
              © 2024 wepretiffy. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a
                href="#"
                className="text-foreground hover:text-black transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-foreground hover:text-black transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-foreground hover:text-black transition-colors"
              >
                Cancellation Policy
              </a>
              <a
                href="#"
                className="text-foreground hover:text-black transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
