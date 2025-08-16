import React from "react";
import { Link } from "react-router-dom";

const navItems = [
  {
    label: "WP",
    icon: (
      <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center rounded-full font-bold text-sm transition-all duration-300 group-hover:scale-110">
        WP
      </div>
    ),
    path: "/",
    active: true,
    notification: false,
  },
  {
    label: "Skin analyzer",
    icon: (
      <span className="text-2xl transition-all duration-300 group-hover:scale-110">
        💄
      </span>
    ),
    path: "/skinanalyzer",
    active: false,
    notification: false,
  },
  {
    label: "Services",
    icon: (
      <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="1" y="4" width="14" height="10" fill="#6b7280" />
          <rect x="3" y="2" width="10" height="3" fill="#ffffff" />
        </svg>
      </div>
    ),
    path: "/services",
    active: false,
    notification: true,
  },
  {
    label: "Profile",
    icon: (
      <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-xl transition-all duration-300 group-hover:scale-110">
        👤
      </div>
    ),
    path: "/profile",
    active: false,
    notification: false,
  },
];

const MobileNavbar = () => (
  <nav className="fixed bottom-0 left-0 w-full h-16 bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] flex justify-around items-center z-50 transition-all duration-300">
    {navItems.map((item) => (
      <Link
        key={item.label}
        to={item.path}
        className="group flex flex-col items-center justify-center relative min-w-[60px] py-2 transition-all duration-300 hover:bg-gray-50/50 rounded-lg"
      >
        <div className="relative">
          {item.icon}
          {item.notification && (
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          )}
        </div>
        <div
          className={`text-xs mt-1.5 font-medium transition-colors duration-300 ${
            item.active ? "text-indigo-600 font-semibold" : "text-gray-600"
          } group-hover:text-indigo-600`}
        >
          {item.label}
        </div>
      </Link>
    ))}
  </nav>
);

export default MobileNavbar;
