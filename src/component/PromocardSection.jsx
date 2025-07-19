import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import spaImage from "../assets/women_sal.png";
import ServicePromoCard from "./ui/promocard-section"; // ✅ Corrected import

const PromocardSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [maxSlide, setMaxSlide] = useState(0);

  const services = [
    {
      id: 1,
      name: "Rejuvenating Facial",
      duration: "90 minutes",
      price: "₹150",
      rating: 4.9,
      image: spaImage,
    },
    {
      id: 2,
      name: "Hot Stone Massage",
      duration: "75 minutes",
      price: "₹130",
      rating: 4.8,
      image: spaImage,
    },
    {
      id: 3,
      name: "Lymphatic Drainage",
      duration: "60 minutes",
      price: "₹120",
      rating: 4.9,
      image: spaImage,
    },
    {
      id: 4,
      name: "Aromatherapy Treatment",
      duration: "75 minutes",
      price: "₹140",
      rating: 4.7,
      image: spaImage,
    },
    {
      id: 5,
      name: "Diamond Microdermabrasion",
      duration: "45 minutes",
      price: "₹180",
      rating: 4.9,
      image: spaImage,
    },
    {
      id: 6,
      name: "Deep Tissue Massage",
      duration: "90 minutes",
      price: "₹160",
      rating: 4.8,
      image: spaImage,
    },
    {
      id: 7,
      name: "Facial Glow Treatment",
      duration: "60 minutes",
      price: "₹110",
      rating: 4.6,
      image: spaImage,
    },
  ];

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 4,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1280px)": {
        slides: { perView: 3.2, spacing: 12 },
      },
      "(max-width: 1024px)": {
        slides: { perView: 2.2, spacing: 10 },
      },
      "(max-width: 768px)": {
        slides: { perView: 1.2, spacing: 8 },
      },
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
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
      setMaxSlide(Math.max(0, totalSlides - perView));
    },
  });

  return (
    <section
      id="services"
      className="py-16 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            Explore Popular Services
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {loaded && currentSlide > 0 && (
            <button
              onClick={() => instanceRef.current?.prev()}
              className="absolute left-[-10px] top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-md border border-gray-200 shadow-md text-gray-800 hover:bg-white hover:scale-105 transition-all p-2 md:p-3 rounded-full"
            >
              <ChevronLeft size={15} />
            </button>
          )}

          {loaded && currentSlide < maxSlide && (
            <button
              onClick={() => instanceRef.current?.next()}
              className="absolute right-[-10px] top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-md border border-gray-200 shadow-md text-gray-800 hover:bg-white hover:scale-105 transition-all p-2 md:p-3 rounded-full"
            >
              <ChevronRight size={15} />
            </button>
          )}

          <div ref={sliderRef} className="keen-slider">
            {services.map((service, index) => (
              <div key={index} className="keen-slider__slide">
                <ServicePromoCard
                  title={service.name}
                  subtitle={service.duration}
                  image={service.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromocardSection;
