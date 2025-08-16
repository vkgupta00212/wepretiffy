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
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-100 text-gray-700 py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand & Social */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
              wepretiffy
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Be the best version of you
            </p>
            <div className="mt-6 flex gap-4">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
              ].map(({ icon: Icon, label }, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Services & Products */}
          <div className="flex flex-row gap-8 lg:gap-12">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-5">
                Our Services
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  "Facial Treatments",
                  "Massage Therapy",
                  "Skincare Consultation",
                  "Aromatherapy",
                  "Wellness Packages",
                ].map((service, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 hover:underline"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-5">
                Product Lines
              </h4>
              <ul className="space-y-3 text-sm">
                {[
                  "Luxury Serums",
                  "Premium Creams",
                  "Cleansing Solutions",
                  "Face Masks",
                  "Gift Sets",
                ].map((product, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 hover:underline"
                    >
                      {product}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-5">
              Get In Touch
            </h4>
            <ul className="space-y-5 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <span>
                  123 Beauty Boulevard
                  <br />
                  Wellness District, CA 90210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                <span>hello@wepretiffy.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t pt-8 border-gray-200 text-sm flex flex-col items-center gap-4 text-gray-600 text-center">
          <span>© 2025 wepretiffy. All rights reserved.</span>
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
                className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 hover:underline"
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
