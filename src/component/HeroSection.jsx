import React, { useState, useEffect } from "react";
import ServiceCard from "./ui/service-card";
import MainImage from "./ui/image-grid";
import WomensSalonCard from "./ui/womensaloonCard";
import WomensSalonCardIn from "./ui/womensaloonCardIn";
import { Star, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MobileHeader from "./ui/mobileheader";

const HeroSection = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Store selected service and subcategory
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreen(); // Initial check
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // ✅ When main category clicked
  const handleServiceClick = (service) => {
    setSelectedService(service);
    setActiveModal("category");
  };

  // ✅ When subcategory clicked
  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setActiveModal("subcategory");
  };

  return (
    <div className="relative bg-white mt-[30px] overflow-hidden ">
      {/* Content that will blur when modal is open */}
      <div
        className={`${
          activeModal ? "blur-sm pointer-events-none" : ""
        } transition-all duration-300`}
      >
        {/* Hero Section */}
        <section
          id="home"
          className="flex flex-col md:flex-col lg:flex-row items-center justify-between w-full px-4 md:px-[1px] lg:px-28 py-[1px] md:py-16 lg:py-24"
        >
          {/* Left */}
          <div className="w-full md:w-[95%] flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-10 lg:gap-12">
            {isMobile && <MobileHeader />}
            <ServiceCard onServiceSelect={handleServiceClick} />
          </div>

          {/* Right Image */}
          <div className="w-full md:w-[95%] flex justify-center items-center mt-[20px] md:mt-[20px]">
            <div className="w-[90vw] md:w-full h-full max-w-[540px]  flex items-center justify-center">
              <MainImage />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full flex justify-center mt-[20px] md:mt-[1px]">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-10 md:gap-20 lg:gap-32 text-center">
            <div className="flex flex-col items-center min-w-[120px]">
              <Star className="h-7 w-7 text-yellow-500 mb-2" />
              <h3 className="text-2xl lg:text-3xl font-bold text-black">4.8</h3>
              <p className="text-sm lg:text-base text-gray-600">
                Service Rating*
              </p>
            </div>
            <div className="flex flex-col items-center min-w-[120px]">
              <Users className="h-7 w-7 text-blue-500 mb-2" />
              <h3 className="text-2xl lg:text-3xl font-bold text-black">
                100K+
              </h3>
              <p className="text-sm lg:text-base text-gray-600">
                Customers Globally*
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ✅ Modals */}
      <AnimatePresence>
        {activeModal === "category" && (
          <motion.div
            key="modal1"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <WomensSalonCard
                onClose={() => setActiveModal(null)}
                service={selectedService} // ✅ Pass selected service
                onSubCategoryClick={handleSubCategoryClick} // ✅ Handle subcategory click
              />
            </motion.div>
          </motion.div>
        )}

        {/* {activeModal === "subcategory" && (
          <motion.div
            key="modal2"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <WomensSalonCardIn
                onClose={() => setActiveModal(null)}
                subCategory={selectedSubCategory} // ✅ Pass selected subcategory
              />
            </motion.div>
          </motion.div>
        )} */}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
