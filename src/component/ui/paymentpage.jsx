import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PaymentCard from "./paymentCard";
import PaymentCard2 from "./paymentCard2";
import PaymentCardButton from "./paymentCardButton";
import AddressFormCard from "./addressCard";
import { motion, AnimatePresence } from "framer-motion";
import SlotCard from "./slotCard";

const PaymentPage = () => {
  const location = useLocation();
  const selectedPackage = location.state;

  const { cartItems = [], total = 0 } = location.state || {};
  const itemTotal = parseInt(total) || 0; // ✅ Properly parse itemTotal
  const taxesAndFee = 79;
  const surgeCharge = 200;

  const calculateTotal = () => itemTotal + taxesAndFee + surgeCharge;

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
      setIsLaptop(window.innerWidth >= 1024);
    };
    checkScreen(); // Initial check
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleRazorpayPayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_live_sdP67bgbbdrRid",
      amount: calculateTotal() * 100, // in paise
      currency: "INR",
      name: "WePretiffy",
      description: selectedPackage?.title || "Selected Package",
      image: "/logo.png",
      handler: function (response) {
        alert(
          `✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`
        );
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#8b5cf6",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="mt-[40px] bg-gray-50 flex items-center justify-center relative">
      <div className="flex flex-col md:flex-row gap-5">
        <PaymentCard
          onSelectAddress={() => setShowAddressModal(true)}
          onSelectSlot={() => setShowSlotModal(true)}
          onProceedPayment={handleRazorpayPayment}
        />
        <div className="md:mt-[100px] flex flex-col gap-[10px]">
          <PaymentCard2 cartItems={cartItems} calculateTotal={calculateTotal} />
          <PaymentCardButton
            itemTotal={itemTotal}
            surgeCharge={surgeCharge}
            taxesAndFee={taxesAndFee}
            calculateTotal={calculateTotal}
          />
        </div>
      </div>

      {/* Address Modal */}
      <AnimatePresence>
        {showAddressModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 60 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg"
            >
              <AddressFormCard />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="text-sm text-violet-700 hover:underline"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slot Modal */}
      <AnimatePresence>
        {showSlotModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 60 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 60 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg"
            >
              <SlotCard />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowSlotModal(false)}
                  className="text-sm text-violet-700 hover:underline"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentPage;
