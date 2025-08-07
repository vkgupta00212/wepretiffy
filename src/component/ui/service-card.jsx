import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./card";
import GetSubCategory from "../../backend/homepageimage/getcategory";
import SearchCard from "../ui/searchcard";

// Reusable ServiceCard component
const ServiceCard = ({ icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col items-center space-y-3 transition-transform duration-300 hover:scale-105"
    >
      <Card className="w-[100px] h-[100px] sm:w-[160px] sm:h-[160px] md:w-[120px] md:h-[120px] rounded-[10px] overflow-hidden border border-gray-300 bg-gray-50 flex">
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

const ServiceCardSection = ({ onServiceSelect }) => {
  const [serviceList, setServiceList] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  // Detect mobile
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await GetSubCategory();
        setServiceList(data); // Load only 8
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col items-center px-[1px] sm:px-6 md:px-[5px] lg:px-[10px] font-sans">
      <div className="w-full max-w-7xl">
        <div>{isMobile && <SearchCard />}</div>

        <div className="bg-white border border-gray-200 rounded-[5px] w-full py-6 px-4 sm:px-6 text-start">
          <h3 className="text-lg sm:text-xl md:text-[18px] font-normal tracking-normal text-gray-800 mb-6">
            What are you looking for?
          </h3>

          {loading ? (
            <div className="w-full text-center py-10 text-gray-500 text-sm">
              Loading services...
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-x-6 gap-y-10 justify-center">
              {serviceList.map((service) => (
                <ServiceCard
                  key={service.id}
                  icon={`https://weprettify.com/images/${service.ServiceImage}`}
                  label={service.ServiceName}
                  onClick={() => onServiceSelect(service)} // ✅ Pass selected service
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSection;
