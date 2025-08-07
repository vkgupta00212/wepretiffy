import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import GetServicesTab from "../../backend/selectservices/getservicestab";

// Individual service card
const SelectServiceCard = ({ label, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex flex-col items-center space-y-2 ${
        isActive ? "border-2 border-pink-500 rounded-xl" : ""
      }`}
    >
      <Card className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] lg:w-[75px] lg:h-[75px] rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center">
        <CardContent className="p-0 flex items-center justify-center w-full h-full">
          {/* Optional image if needed later */}
          <span className="text-xs text-gray-700 text-center">{label[0]}</span>
        </CardContent>
      </Card>
      <span className="text-[10px] md:text-[11px] lg:text-[12px] font-normal text-center text-black leading-tight max-w-[80px]">
        {label}
      </span>
    </div>
  );
};

// Main component
const SelectServiceCardSection = ({
  subService,
  onChangeSubService,
  selectedSubService,
}) => {
  const [getServiceTab, setGetServiceTab] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceTab = async () => {
      try {
        setLoading(true);
        const data = await GetServicesTab(subService?.serviceId); // you can replace `1` with subService.Serviceid if needed
        setGetServiceTab(data);
        console.log("Fetched services:", data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceTab();
  }, []);

  return (
    <div className="w-full sm:w-[350px] md:w-[300px] lg:w-[280px] mx-auto sm:mx-0">
      <h1 className="text-[22px] md:text-[26px] lg:text-[28px] font-semibold mb-2 text-black">
        {subService?.text || "Salon Luxe"}
      </h1>

      <p className="text-[12px] md:text-[14px] lg:text-[15px] text-gray-600 mb-4 line-clamp-3 overflow-hidden">
        {subService?.description || "No description available"}
      </p>

      <div className="bg-gray-50 p-4 border border-gray-300 rounded-[5px] w-full overflow-hidden">
        <h2 className="text-[13px] font-normal mb-3 text-black">
          Select a service
        </h2>

        {loading ? (
          <p className="text-sm text-gray-500">Loading services...</p>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-3 gap-x-3 gap-y-4 md:gap-x-4 md:gap-y-5">
            {getServiceTab.map((service) => (
              <SelectServiceCard
                key={service.id}
                label={service.Tabname}
                isActive={selectedSubService?.id === service.id}
                onClick={() => onChangeSubService(service)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectServiceCardSection;
