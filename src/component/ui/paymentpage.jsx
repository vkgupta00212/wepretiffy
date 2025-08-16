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
  const {
    cartItems = [],
    total = 0,
    discountfee = 0,
    title = "Selected Package",
  } = location.state || {};

  const itemTotal = parseInt(total) || 0;
  const discountFee = parseInt(discountfee) || 0;
  const surgeCharge = 200;
  const taxesAndFee = 79;

  const calculateTotal = () => {
    const rawTotal = itemTotal + surgeCharge + taxesAndFee - discountFee;
    return rawTotal > 0 ? rawTotal : 0;
  };

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRazorpayPayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded.");
      return;
    }

    const options = {
      key: "rzp_live_sdP67bgbbdrRid",
      amount: calculateTotal() * 100,
      currency: "INR",
      name: "WePretiffy",
      description: `${title} on ${selectedSlot?.day?.label} ${
        selectedSlot?.day?.date
      } at ${selectedSlot?.time || title}`,
      image: "/logo.png",
      handler: function (response) {
        alert(
          `✅ Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`
        );
      },
      prefill: {
        name: selectedAddress?.Name || "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#4f46e5",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8 md:mt-[30px]">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left - Address & Slot Selection */}
        <div>
          <PaymentCard
            onSelectAddress={() => setShowAddressModal(true)}
            onSelectSlot={() => setShowSlotModal(true)}
            onProceedPayment={handleRazorpayPayment}
            selectedAddress={selectedAddress}
            selectedSlot={selectedSlot}
          />
        </div>

        {/* Right - Cart & Payment Summary */}
        <div className="flex flex-col gap-4 md:mt-[40px]">
          <PaymentCard2 cartItems={cartItems} calculateTotal={calculateTotal} />
          <PaymentCardButton
            discountFee={discountFee}
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md"
            >
              <AddressFormCard
                onClose={() => setShowAddressModal(false)}
                onSelectAddress={(address) => {
                  setSelectedAddress(address);
                  setShowAddressModal(false);
                }}
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowAddressModal(false)}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all"
                >
                  Cancel
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md"
            >
              <SlotCard
                onSelectSlot={(slot) => {
                  setSelectedSlot(slot);
                  setShowSlotModal(false);
                }}
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowSlotModal(false)}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-all"
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
