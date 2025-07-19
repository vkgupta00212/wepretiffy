import React, { useState } from "react";
import ServiceCard from "./ui/service-card";
import MainImage from "./ui/image-grid";
import WomensSalonCard from "./ui/womensaloonCard";
import WomensSalonCardIn from "./ui/womensaloonCardIn"; // new sub-modal
import { Star, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="flex flex-col relative">
      <section
        id="home"
        className={`relative min-h-screen flex items-center justify-center overflow-hidden m-5 transition-all ${
          activeModal ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <ServiceCard onWomensSalonClick={() => setActiveModal("category")} />
        </div>
        <div>
          <MainImage />
        </div>
      </section>

      <section
        className={`transition-all ${
          activeModal ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-10 text-center">
          <div className="flex flex-col items-center">
            <Star className="h-6 w-6 text-black mb-1" />
            <div className="text-xl font-semibold text-black">4.8</div>
            <p className="text-sm text-gray-700">Service Rating*</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-6 w-6 text-black mb-1" />
            <div className="text-xl font-semibold text-black">12M+</div>
            <p className="text-sm text-gray-700">Customers Globally*</p>
          </div>
        </div>
      </section>

      {/* 🔥 AnimatePresence for both modals */}
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
                onServiceClick={() => setActiveModal("subcategory")}
              />
            </motion.div>
          </motion.div>
        )}

        {activeModal === "subcategory" && (
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
              <WomensSalonCardIn onClose={() => setActiveModal(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
