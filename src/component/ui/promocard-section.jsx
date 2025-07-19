import React from "react";
const ServicePromoCard = ({ title, subtitle, image }) => {
  return (
    <div className="m-1">
      <div
        className="relative w-full h-[225px] rounded-[10px] overflow-hidden shadow-md bg-black"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay content */}
        {/* <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-between text-white">
         <div className="absolute inset-0 bg-black/40 p-4 flex flex-col justify-between text-white">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm mt-1">{subtitle}</p>
        </div>
        <button className="bg-white text-black text-sm px-4 py-1 rounded shadow w-max hover:bg-gray-200">
          Book now
        </button>
      </div>
      </div> */}
      </div>
    </div>
  );
};

export default ServicePromoCard;
