import React from "react";
import facemask from "../../assets/girlIn.png";
import { Card, CardContent } from "../ui/card";

const SelectServiceCard = ({ icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col items-center space-y-2"
    >
      <Card className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] lg:w-[75px] lg:h-[75px] rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
        <CardContent className="p-0 flex items-center justify-center w-full h-full">
          <img
            src={icon}
            alt={label}
            className="w-full h-full object-contain p-[2px]"
          />
        </CardContent>
      </Card>
      <span className="text-[10px] md:text-[11px] lg:text-[12px] font-normal text-center text-black leading-tight max-w-[80px]">
        {label}
      </span>
    </div>
  );
};

const SelectServiceCardSection = ({ onWomensSalonClick }) => {
  return (
    <div className="w-full sm:w-[350px] md:w-[300px] lg:w-[280px] mx-auto sm:mx-0">
      <h1 className="text-[22px] md:text-[26px] lg:text-[28px] font-semibold mb-6 text-black">
        Salon Luxe
      </h1>

      <div className="bg-gray-50 p-4 border border-gray-300 rounded-[5px] w-full overflow-hidden">
        <h2 className="text-[13px] font-normal mb-3 text-black">
          Select a service
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-4 md:gap-x-4 md:gap-y-5">
          <SelectServiceCard
            icon={facemask}
            label="Packages"
            onClick={onWomensSalonClick}
          />
          <SelectServiceCard icon={facemask} label="Waxing" />
          <SelectServiceCard icon={facemask} label="Facial" />
          <SelectServiceCard icon={facemask} label="Korean facial" />
          <SelectServiceCard icon={facemask} label="Cleanup" />
          <SelectServiceCard icon={facemask} label="Pedicure & manicure" />
          <SelectServiceCard icon={facemask} label="Threading & face wax" />
          <SelectServiceCard icon={facemask} label="Bleach, detan & massage" />
        </div>
      </div>
    </div>
  );
};

export default SelectServiceCardSection;
