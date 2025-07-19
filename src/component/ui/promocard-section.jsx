import React from "react";

const ServicePromoCard = ({ title, subtitle, image }) => {
  return (
    <div className="m-2">
      <div
        className="relative w-full h-[225px] rounded-xl overflow-hidden shadow-lg"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 flex flex-col justify-end text-white">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">{title}</h3>
            {subtitle && <p className="text-sm">{subtitle}</p>}
          </div>
          <button className="mt-3 bg-white text-black text-sm px-4 py-2 rounded-md shadow-md w-max hover:bg-gray-200 transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicePromoCard;
