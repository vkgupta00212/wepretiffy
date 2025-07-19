import React from "react";
import { X } from "lucide-react";
import img1 from "../../assets/facemask.png";

const services = [
  { icon: img1, label: "Makeup & Styling Studio" },
  { icon: img1, label: "Makeup & Styling Studio" },
  { icon: img1, label: "Makeup & Styling Studio" },
  { icon: img1, label: "Makeup & Styling Studio" },
];

const WomensCard = ({ icon, label, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="h-[70px] flex flex-col items-center p-2 bg-gray-100 rounded-lg border border-black-900 hover:bg-gray-200 transition">
        <img src={icon} alt={label} className="w-[50px] h-[50px] mb-2" />
      </div>
      <span className="text-center text-[12px] font-normal text-black block mt-1">
        {label}
      </span>
    </div>
  );
};

const WomensSalonCard = ({ onClose, onServiceClick }) => {
  return (
    <div className="bg-white rounded-2xl p-6 w-full max-w-xl relative shadow-lg z-50">
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Women's Salon & Spa
      </h2>

      {/* Grid of Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2">
        {services.map((service, index) => (
          <WomensCard
            key={index}
            icon={service.icon}
            label={service.label}
            onClick={() => {
              onClose(); // Close current modal
              onServiceClick(); // Open subcategory modal
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WomensSalonCard;
