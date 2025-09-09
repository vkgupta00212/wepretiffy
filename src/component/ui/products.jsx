import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./card";
import { useNavigate } from "react-router-dom";
import spaImage from "../../assets/facialimg.png";
import GetProduct from "../../backend/getproduct/getproduct";
import { AlertCircle } from "lucide-react";

const ProductScreen = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const data = await GetProduct();
        setServices(data || []);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleServiceClick = (service) => {
    navigate("/womensaloonIn", { state: { subService: service } });
  };

  const imageBaseUrl = "https://weprettify.com/Images/";

  const SkeletonCard = () => (
    <Card className="flex flex-col h-[360px] rounded-lg shadow-lg border animate-pulse">
      <CardContent className="p-0 flex-grow">
        <div className="h-[200px] bg-gray-200 rounded-t-lg"></div>
      </CardContent>
      <div className="mt-3 px-4 py-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </Card>
  );

  return (
    <section id="services" className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-3xl sm:text-4xl lg:text-[25px] font-medium text-gray-900 mb-10 text-center md:text-left tracking-tight">
          Explore Our Products
        </h2>

        {/* Error Message */}
        {error && (
          <div className="flex items-center justify-center mb-8 text-red-600 bg-red-50 p-4 rounded-lg shadow-sm">
            <AlertCircle className="mr-2" size={24} />
            <span className="text-lg font-medium">{error}</span>
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {isLoading ? (
            Array(5)
              .fill()
              .map((_, index) => <SkeletonCard key={index} />)
          ) : services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} onClick={() => handleServiceClick(service)}>
                <Card className="flex flex-col cursor-pointer h-[360px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-300">
                  <CardContent className="p-0 flex-grow">
                    <div className="h-[200px] overflow-hidden rounded-t-lg">
                      <img
                        src={
                          service.image
                            ? `${imageBaseUrl}${service.image}`
                            : spaImage
                        }
                        alt={service.ProductName || "Product"}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = spaImage;
                        }}
                      />
                    </div>
                  </CardContent>
                  <div className="px-4 py-4 flex flex-col flex-grow">
                    <span className="text-lg font-semibold text-gray-900 truncate block leading-tight mb-2">
                      {service.ProductName}
                    </span>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {service.ProductDes}
                    </p>
                    <span className="text-base font-medium text-gray-900 mt-auto">
                      ${Number(service.Price).toFixed(2) || "0.00"}
                    </span>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 py-12">
              <p className="text-xl font-medium">
                No products available at this time.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductScreen;
