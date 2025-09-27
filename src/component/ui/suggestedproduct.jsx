import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./card";
import { useNavigate } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import spaImage from "../../assets/facialimg.png";
import { AlertCircle } from "lucide-react";
import GetSuggestProduct from "../../backend/getproduct/suggestedproducts";

const SuggestProductScreen = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  // Keen Slider setup
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 16 },
    breakpoints: {
      "(max-width: 1280px)": { slides: { perView: 3, spacing: 12 } },
      "(max-width: 768px)": { slides: { perView: 2, spacing: 10 } },
      "(max-width: 480px)": { slides: { perView: 1, spacing: 8 } },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // Autoplay
  useEffect(() => {
    if (!instanceRef.current || isLoading) return;
    const autoplay = setInterval(() => instanceRef.current?.next(), 4000);
    return () => clearInterval(autoplay);
  }, [instanceRef, isLoading]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await GetSuggestProduct();
        setServices(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleServiceClick = (service) => {
    navigate("/productmainpage", { state: { subService: service } });
  };

  const SkeletonCard = () => (
    <Card className="flex flex-col h-[360px] sm:h-[400px] rounded-xl shadow-lg border animate-pulse">
      <CardContent className="p-0 flex-grow">
        <div className="h-[180px] sm:h-[200px] bg-gray-200 rounded-t-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
        </div>
      </CardContent>
      <div className="mt-3 px-3 sm:px-4 py-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </Card>
  );

  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-full sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="flex items-center justify-center text-red-600 mb-6">
            <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
            <p className="text-sm sm:text-base">{error}</p>
          </div>
        )}
        <div className="relative">
          {isLoading ? (
            <div className="keen-slider" ref={sliderRef}>
              {Array(5)
                .fill()
                .map((_, index) => (
                  <div key={index} className="keen-slider__slide">
                    <SkeletonCard />
                  </div>
                ))}
            </div>
          ) : services.length > 0 ? (
            <>
              <div ref={sliderRef} className="keen-slider">
                {services.map((service) => (
                  <div key={service.ProID} className="keen-slider__slide">
                    <Card
                      className="flex flex-col cursor-pointer h-[360px] sm:h-[400px] rounded-xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-indigo-300 transition-all duration-300"
                      onClick={() => handleServiceClick(service)}
                    >
                      <CardContent className="p-0 flex-grow">
                        <div className="h-[180px] sm:h-[200px] overflow-hidden rounded-t-xl">
                          <img
                            src={service.imageUrl || spaImage}
                            alt={service.ProductName || "Product"}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = spaImage;
                            }}
                          />
                        </div>
                      </CardContent>
                      <div className="px-3 sm:px-4 py-4 flex flex-col flex-grow">
                        <span className="text-base sm:text-lg font-semibold text-gray-900 truncate block leading-tight mb-2">
                          {service.ProductName || "Unnamed Product"}
                        </span>
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3">
                          {service.ProductDes || "No description available."}
                        </p>
                        <span className="text-sm sm:text-base font-medium text-gray-900 mt-auto">
                          ₹{Number(service.Price || 0).toFixed(2)}
                        </span>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              {loaded && instanceRef.current && services.length > 1 && (
                <>
                  <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 sm:px-6">
                    <button
                      onClick={() => instanceRef.current?.prev()}
                      className="p-2 sm:p-3 bg-black text-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200"
                      aria-label="Previous slide"
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => instanceRef.current?.next()}
                      className="p-2 sm:p-3 bg-black text-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200"
                      aria-label="Next slide"
                    >
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute bottom-[-2rem] sm:bottom-[-2.5rem] left-0 right-0 flex justify-center space-x-2">
                    {services.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => instanceRef.current?.moveToIdx(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                          currentSlide === index
                            ? "bg-indigo-600 scale-125"
                            : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-center text-gray-600 py-10 sm:py-12">
              <p className="text-base sm:text-xl font-medium">
                No products available at this time.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SuggestProductScreen;
