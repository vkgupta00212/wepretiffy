import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./card";
import HomepageImageShowAPI from "../../backend/homepageimage/homepageImageShow";

// Reusable ServiceCard component
const ServiceCard = ({ icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col items-center space-y-3 transition-transform duration-300 hover:scale-105"
    >
      <Card className="w-[100px] h-[100px] sm:w-[160px] sm:h-[160px] md:w-[130px] md:h-[130px] rounded-[10px] overflow-hidden border border-gray-300 bg-gray-50 flex">
        <CardContent className="p-0 flex items-center justify-center w-full h-full">
          <img
            src={icon}
            alt={label}
            className="w-full h-full object-contain p-[4px]"
          />
        </CardContent>
      </Card>
      <span className="text-sm sm:text-base font-normal text-center text-gray-800 max-w-[160px] leading-tight">
        {label}
      </span>
    </div>
  );
};

const ServiceCardSection = ({ onWomensSalonClick }) => {
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await HomepageImageShowAPI();
      setServiceList(data.slice(8, 16)); // only first 8
    };
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col items-center px-[1px] sm:px-6 md:px-[5px] lg:px-[10px] font-sans">
      <div className="w-full max-w-7xl">
        <h2 className="text-[24px] sm:text-[32px] md:text-[36px] md:font-semibold font-bold sm:font-extrabold tracking-tight text-gray-900 mb-3 sm:mb-5">
          Home services at your doorstep
        </h2>

        <div className="g-white border border-gray-200 rounded-2xl shadow-md w-full py-6 px-4 sm:px-6 text-start">
          <h3 className="text-lg sm:text-xl md:text-[18px] font-normal tracking-normal text-gray-800 mb-6">
            What are you looking for?
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-x-6 gap-y-10 justify-center">
            {serviceList.map((service) => (
              <ServiceCard
                key={service.id}
                icon={`https://weprettify.com/images/${service.ServiceImage}`}
                label={service.ServiceName}
                onClick={onWomensSalonClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSection;
