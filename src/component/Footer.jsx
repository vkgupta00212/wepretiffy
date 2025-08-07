import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "../component/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-white to-gray-100 border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-[10px] xl:gap-x-16">
          {/* Brand & Social */}
          <div>
            <h1 className="text-[35px] font-bold text-black">wepretiffy</h1>
            <p className="text-sm text-gray-600 mt-1">
              Be the best version of you
            </p>
            <div className="mt-5 flex gap-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Services & Products */}
          <div className="flex flex-row gap-12">
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2 text-sm">
                {[
                  "Facial Treatments",
                  "Massage Therapy",
                  "Skincare Consultation",
                  "Aromatherapy",
                  "Wellness Packages",
                ].map((service, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-black transition-colors">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product Lines</h4>
              <ul className="space-y-2 text-sm">
                {[
                  "Luxury Serums",
                  "Premium Creams",
                  "Cleansing Solutions",
                  "Face Masks",
                  "Gift Sets",
                ].map((product, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-black transition-colors">
                      {product}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-4 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 text-black" />
                <span>
                  123 Beauty Boulevard
                  <br />
                  Wellness District, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-black" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-black" />
                <span>hello@wepretiffy.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t pt-6 border-gray-200 text-sm flex flex-col items-center gap-4 text-gray-600 text-center">
          <span>© 2024 wepretiffy. All rights reserved.</span>
          <div className="flex gap-6 flex-wrap justify-center">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Cancellation Policy",
              "Contact Us",
            ].map((link, i) => (
              <a
                key={i}
                href="#"
                className="hover:text-black transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
