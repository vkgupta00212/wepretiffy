import React from "react";
import { Card, CardContent } from "./card";
import { useEffect, useState } from "react";
import facemask from "../../assets/facemask.png";
import HomepageImageShowAPI from "../../backend/homepageimage/homepageImageShow";

// Reusable ServiceCard component
const ServiceCard = ({ icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col items-center space-y-2"
    >
      <Card className="w-[75px] h-[75px] rounded-xl overflow-hidden border border-black-200 flex items-center justify-center">
        <CardContent className="p-0 flex items-center justify-center w-full h-full">
          <img
            src={icon}
            alt={label}
            className="w-full h-full object-contain "
          />
        </CardContent>
      </Card>
      <span className="text-[12px] font-normal text-center text-black leading-tight max-w-[80px]">
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
      setServiceList(data.slice(0, 8));
    };
    fetchData();
  }, []);
  return (
    <div className="p-6 md:p-12">
      <h1 className="text-[35px] font-medium mb-10 text-black w-[500px] text-start">
        Home services at your doorstep
      </h1>

      <div className="bg-gray-50 p-6 border border-black-900 rounded-[15px] w-[500px]">
        <h2 className="text-xl font-semibold mb-6 text-start p-2">
          What are you looking for?
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 p-2">
          {/* Only this card has the click event attached */}
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
  );
};

export default ServiceCardSection;
