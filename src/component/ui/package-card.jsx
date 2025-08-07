import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import GetServicePack from "../../backend/servicepack/getservicepack";

const PackageCardItem = ({
  image,
  servicename,
  duration,
  fees,
  discountfee,
  onAdd,
}) => {
  return (
    <div className="w-full rounded-[5px] border border-gray-300 bg-white transition-transform duration-200 ">
      <div className="mb-4">
        <Card className="rounded-[5px] overflow-hidden">
          <CardContent className="p-0">
            <img
              src={image}
              alt={servicename}
              className="w-full h-48 object-cover"
            />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2 p-[10px]">
        <h2 className="text-lg font-semibold text-gray-800">{servicename}</h2>

        <div className="flex flex-wrap gap-2 text-sm font-medium text-gray-800">
          <span>₹{discountfee || fees}</span>
          {discountfee && (
            <span className="line-through text-gray-500">₹{fees}</span>
          )}
          <span className="text-gray-500">• {duration}</span>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onAdd}
            className="text-sm px-4 py-1 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

const PackageCard = ({ addToCart, selectedServiceTab }) => {
  const [servicePackages, setServicePackages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const data = await GetServicePack(selectedServiceTab.SubCatid);
        setServicePackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [selectedServiceTab]);

  return (
    <div className="w-full bg-inherit">
      <div className="w-full max-w-xl mx-auto px-[1px] sm:px-6 lg:px-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8 text-start">
          Service Packs
        </h1>

        {loading ? (
          <p className="text-sm text-gray-600">Loading packages...</p>
        ) : servicePackages.length === 0 ? (
          <p className="text-sm text-gray-500">No packages available.</p>
        ) : (
          servicePackages.map((pkg) => (
            <div key={pkg.id} className="mt-3">
              <PackageCardItem {...pkg} onAdd={() => addToCart(pkg)} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PackageCard;
