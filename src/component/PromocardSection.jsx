import React, { useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ServicePromoCard from "./ui/promocard-section";
import { ChevronRight, ChevronLeft } from "lucide-react";
import image from "../assets/serviceAdd.png";

// Sample cards
const promoCards = [
  {
    title: "Transform your space with wall panels",
    subtitle: "Starts at ₹6,999 only",
    image,
    bgColor: "bg-white",
    textColor: "text-black",
  },
  {
    title: "Kitchen cleaning starting at ₹399 only",
    subtitle: "",
    image,
    bgColor: "bg-green-700",
    textColor: "text-white",
  },
  {
    title: "Deep clean with foam-jet AC service",
    subtitle: "AC service & repair",
    image,
    bgColor: "bg-gray-100",
    textColor: "text-black",
  },
  {
    title: "New Sofa Cleaning",
    subtitle: "Only ₹799",
    image,
    bgColor: "bg-white",
    textColor: "text-black",
  },
  {
    title: "Another Cleaning Service",
    subtitle: "Starts at ₹499",
    image,
    bgColor: "bg-white",
    textColor: "text-black",
  },
  {
    title: "Premium Wall Work",
    subtitle: "₹2,499 and up",
    image,
    bgColor: "bg-white",
    textColor: "text-black",
  },
];

const PromoCardSlider = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxSlide, setMaxSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [instanceRef, slider] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 16,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2.2, spacing: 12 },
      },
      "(max-width: 768px)": {
        slides: { perView: 1.2, spacing: 10 },
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
      const max = Math.max(0, totalSlides - perView);
      setMaxSlide(max);
    },
  });

  const handleNext = () => {
    slider.current?.next();
  };

  const handlePrev = () => {
    slider.current?.prev();
  };

  return (
    <section className="w-full py-10 px-4">
      <div className="max-w-[1300px] mx-auto relative">
        <h2 className="text-2xl font-semibold text-black mb-6 text-start">
          Explore Popular Services
        </h2>

        {/* Keen Slider */}
        <div
          ref={(ref) => {
            sliderRef.current = ref;
            instanceRef(ref);
          }}
          className="keen-slider"
        >
          {promoCards.map((card, index) => (
            <div
              key={index}
              className="keen-slider__slide px-2 transition-transform duration-100 ease-in-out"
            >
              <div className="cursor-pointer transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg rounded-xl">
                <ServicePromoCard {...card} />
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        {loaded && currentSlide > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-800 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Arrow */}
        {loaded && currentSlide < maxSlide && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full z-10 hover:bg-gray-800 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </section>
  );
};

export default PromoCardSlider;
