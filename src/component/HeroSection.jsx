import React, { useState } from "react";
import ServiceCard from "./ui/service-card";
import MainImage from "./ui/image-grid";
import WomensSalonCard from "./ui/womensaloonCard";
import WomensSalonCardIn from "./ui/womensaloonCardIn";
import { Star, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="flex flex-col relative bg-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section
        id="home"
        className={`flex flex-col md:flex-row items-center justify-between w-full transition-all duration-300 ${
          activeModal ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Left */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-10">
          <ServiceCard onWomensSalonClick={() => setActiveModal("category")} />
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-[30px]">
          <div className="w-[90vw] h-full max-w-[540px] aspect-[4/3] flex items-center justify-center">
            <MainImage />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`w-full flex justify-center ${
          activeModal ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-10 md:gap-16 text-center mt-[30px]">
          <div className="flex flex-col items-center min-w-[120px]">
            <Star className="h-7 w-7 text-yellow-500 mb-2" />
            <h3 className="text-2xl font-bold text-black">4.8</h3>
            <p className="text-sm text-gray-600">Service Rating*</p>
          </div>
          <div className="flex flex-col items-center min-w-[120px]">
            <Users className="h-7 w-7 text-blue-500 mb-2" />
            <h3 className="text-2xl font-bold text-black">12M+</h3>
            <p className="text-sm text-gray-600">Customers Globally*</p>
          </div>
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === "category" && (
          <motion.div
            key="modal1"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 100 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-full max-w-xl"
            >
              <WomensSalonCard
                onClose={() => setActiveModal(null)}
                onServiceClick={() => setActiveModal("subcategory")}
              />
            </motion.div>
          </motion.div>
        )}

        {activeModal === "subcategory" && (
          <motion.div
            key="modal2"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 100 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="w-full max-w-xl"
            >
              <WomensSalonCardIn onClose={() => setActiveModal(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
