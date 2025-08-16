import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Card, CardContent } from "../component/ui/card";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import spaImage from "../assets/facialimg.png";
import GetMenServices from "../backend/men_women_popular/getmenservices";

const ServicesCarousel4 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [maxSlide, setMaxSlide] = useState(0);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 5,
      spacing: 16,
    },
    drag: true, // Enable drag for smooth interaction
    friction: 0.2, // Smooth drag friction
    duration: 600, // Smooth transition duration (ms)
    breakpoints: {
      "(max-width: 1280px)": {
        slides: { perView: 4, spacing: 12 },
      },
      "(max-width: 1024px)": {
        slides: { perView: 3, spacing: 12 },
      },
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 500px)": {
        slides: { perView: 1, spacing: 8 },
      },
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
      console.log(
        "Current slide:",
        s.track.details.rel,
        "Max slide:",
        maxSlide
      ); // Debug log
    },
    created(s) {
      setLoaded(true);
      const totalSlides = s.track.details.slides.length;
      const perView =
        typeof s.options.slides === "object" &&
        s.options.slides &&
        typeof s.options.slides.perView === "number"
          ? s.options.slides.perView
          : 1;
      const max = Math.max(0, totalSlides - perView);
      setMaxSlide(max);
      console.log(
        "Slider created, total slides:",
        totalSlides,
        "maxSlide:",
        max
      ); // Debug log
    },
    updated(s) {
      // Added to recalculate maxSlide after updates (e.g., data load)
      const totalSlides = s.track.details.slides.length;
      const perView =
        typeof s.options.slides === "object" &&
        s.options.slides &&
        typeof s.options.slides.perView === "number"
          ? s.options.slides.perView
          : 1;
      const max = Math.max(0, totalSlides - perView);
      setMaxSlide(max);
      console.log(
        "Slider updated, total slides:",
        totalSlides,
        "maxSlide:",
        max
      ); // Debug log
    },
  });

  // Update slider when services change
  useEffect(() => {
    if (loaded && instanceRef.current && services.length > 0) {
      instanceRef.current.update();
    }
  }, [services, loaded, instanceRef]);

  useEffect(() => {
    const fetchPopularServices = async () => {
      try {
        setIsLoading(true);
        const data = await GetMenServices();
        console.log("Fetched services:", data); // Debug log
        setServices(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load services");
        console.error("Error fetching services:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPopularServices();
  }, []);

  const handlePrev = () => instanceRef.current?.prev();
  const handleNext = () => instanceRef.current?.next();

  // Base URL for images (adjust based on actual URL)
  const imageBaseUrl = "https://weprettify.com/images/";

  // Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="keen-slider__slide px-2">
      <div className="m-0">
        <Card className="flex flex-col h-[280px] rounded-lg shadow-lg border animate-pulse">
          <CardContent className="p-0 flex-grow">
            <div className="h-[200px] bg-gray-200 rounded-t-lg"></div>
          </CardContent>
          <div className="mt-3 px-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <section id="services" className="py-5 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-8 text-center md:text-left">
          <h2>Men Services</h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center justify-center mb-6 text-red-600 bg-red-50 p-4 rounded-lg">
            <AlertCircle className="mr-2" size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Slider Container */}
        <div className="relative min-h-[300px] w-full">
          {/* Arrow Buttons */}
          {loaded && services.length > 0 && currentSlide > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-[-10px] sm:left-[-32px] md:left-[-24px] lg:left-[-20px] top-1/2 z-20 transform -translate-y-1/2 bg-gray-900 text-white p-2 sm:p-1 rounded-full hover:bg-gray-700 transition-colors duration-200 shadow-md"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
          )}
          {loaded && services.length > 0 && currentSlide < maxSlide && (
            <button
              onClick={handleNext}
              className="absolute right-[-10px] sm:right-[-32px] md:right-[-24px] lg:right-[-20px] top-1/2 z-20 transform -translate-y-1/2 bg-gray-900 text-white p-2 sm:p-1 rounded-full hover:bg-gray-700 transition-colors duration-200 shadow-md"
              aria-label="Next slide"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Keen Slider */}
          <div ref={sliderRef} className="keen-slider">
            {isLoading ? (
              // Show skeleton loaders while fetching
              Array(5)
                .fill()
                .map((_, index) => <SkeletonCard key={index} />)
            ) : services.length > 0 ? (
              services.map((service) => (
                <div key={service.id} className="keen-slider__slide px-2">
                  <div className="m-0">
                    <Card className="flex flex-col cursor-pointer h-[280px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-300">
                      <CardContent className="p-0 flex-grow">
                        <div className="h-[200px] overflow-hidden rounded-t-lg">
                          <img
                            src={
                              service.Image
                                ? `${imageBaseUrl}${service.Image}`
                                : spaImage
                            }
                            alt={service.Text}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = spaImage;
                            }}
                          />
                        </div>
                      </CardContent>
                      <div className="px-4 py-3">
                        <span className="text-base font-medium text-gray-900 truncate block">
                          {service.Text}
                        </span>
                      </div>
                    </Card>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No services available at the moment.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel4;
