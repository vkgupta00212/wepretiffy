import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { GetSubCategory } from "../../backend/subcategory/getsubcategory";

const WomensCard = ({ icon, label, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="h-[70px] flex flex-col items-center p-2 bg-gray-100 rounded-lg border border-black-900 hover:bg-gray-200 transition">
        <img
          src={icon}
          alt={label}
          className="w-[50px] h-[50px] mb-2 object-cover"
        />
      </div>
      <span className="text-center text-[12px] font-normal text-black block mt-1">
        {label}
      </span>
    </div>
  );
};

const WomensSalonCard = ({ onClose, service }) => {
  const navigate = useNavigate();
  const [subServices, setSubServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await GetSubCategory(service.id, "SubCategory"); // ✅ Dynamic based on service
      setSubServices(data);
      setLoading(false);
    };
    fetchData();
  }, [service]);

  const handleServiceClick = (subService) => {
    navigate("/womensaloonIn", {
      state: {
        subService: subService, // ✅ Pass full subService object
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full max-w-xl relative shadow-lg z-50">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
        onClick={onClose}
      >
        <X size={24} />
      </button>

      {/* ✅ Dynamic Title */}
      <h2 className="text-2xl font-bold mb-6 text-center">
        {service?.ServiceName || "Inavalid Service Name"}
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading sub-services...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-2">
          {subServices.map((subService) => (
            <WomensCard
              key={subService.id}
              icon={`https://weprettify.com/Images/${subService.image}`}
              label={subService.text}
              onClick={() => handleServiceClick(subService)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WomensSalonCard;
