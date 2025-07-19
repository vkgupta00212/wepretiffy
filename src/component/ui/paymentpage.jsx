import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentCard from "./paymentCard";
import PaymentCard2 from "./paymentCard2";
import PaymentCardButton from "./paymentCardButton";
import AddressFormCard from "./addressCard";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { Card, CardContent } from "../ui/card";
import { motion, AnimatePresence } from "framer-motion";
import SlotCard from "./slotCard";

const PaymentPage = () => {
  const location = useLocation();
  const selectedPackage = location.state;
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const itemTotal = parseInt("1318");
  const taxesAndFee = parseInt("79");
  const totalAmount = itemTotal + taxesAndFee;

  const handleRazorpayPayment = () => {
    const options = {
      key: "rzp_live_sdP67bgbbdrRid",
      amount: totalAmount * 100,
      currency: "INR",
      name: "WePretiffy",
      description: selectedPackage?.title || "Selected Package",
      image: "/logo.png",
      handler: function (response) {
        alert(
          "✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center relative">
      <div className="flex flex-row gap-5">
        <div className="rounded-lg">
          <div className="px-4 py-10 max-w-[600px] mx-auto w-[600px]">
            <div className="border border-gray-300 rounded-[5px] p-6 flex flex-col mt-[60px] gap-[20px]">
              {/* Top Location Info */}
              <div className="flex items-center gap-[20px]">
                <Card className="w-[50px] h-[50px] rounded-xl border border-gray-300 flex items-center justify-center">
                  <CardContent className="p-0 w-full h-full flex items-center justify-center">
                    <FaLocationDot className="w-[24px] h-[24px] text-gray-700" />
                  </CardContent>
                </Card>
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-black leading-tight">
                    Send booking details to
                  </span>
                  <span className="text-[14px] font-normal text-black leading-tight mt-[6px]">
                    +91 7700818001
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border border-gray-300" />

              {/* Second Location Info */}
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-[20px]">
                  <Card className="w-[50px] h-[50px] rounded-xl border border-gray-300 flex items-center justify-center">
                    <CardContent className="p-0 w-full h-full flex items-center justify-center">
                      <FaLocationDot className="w-[24px] h-[24px] text-gray-700" />
                    </CardContent>
                  </Card>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-black leading-tight">
                      Address
                    </span>
                  </div>
                </div>
                <div className="w-full rounded-md bg-violet-700 text-center mt-4">
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="p-3 rounded-[7px] text-white text-[16px] font-medium"
                  >
                    Select an address
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="border border-gray-300" />

              {/* Facemask Icon Info 1 */}
              <div className="flex flex-col">
                <div className="flex items-center gap-[20px]">
                  <Card className="w-[50px] h-[50px] rounded-xl border border-gray-300 flex items-center justify-center">
                    <CardContent className="p-0 w-full h-full flex items-center justify-center">
                      <IoIosTime className="w-[24px] h-[24px] text-gray-700" />
                    </CardContent>
                  </Card>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-black leading-tight">
                      Slot
                    </span>
                  </div>
                </div>
                <div className="w-full rounded-md bg-violet-700 text-center mt-4">
                  <button
                    onClick={() => setShowSlotModal(true)}
                    className="p-3 rounded-[7px] text-white text-[16px] font-normal"
                  >
                    Select Slot
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="border border-gray-300" />

              {/* Facemask Icon Info 2 */}
              <div className="flex flex-col">
                <div className="flex items-center gap-[20px]">
                  <Card className="w-[50px] h-[50px] rounded-xl border border-gray-300 flex items-center justify-center">
                    <CardContent className="p-0 w-full h-full flex items-center justify-center">
                      <MdPayment className="w-[24px] h-[24px] text-gray-700" />
                    </CardContent>
                  </Card>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-black leading-tight">
                      Payment Method
                    </span>
                  </div>
                </div>

                <div className="w-full rounded-md bg-violet-700 text-center mt-5">
                  <button
                    onClick={handleRazorpayPayment}
                    className="p-3 rounded-[7px] text-white text-[16px] font-normal"
                  >
                    Proceed Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[100px] flex flex-col gap-4">
          <PaymentCard2 />
          <PaymentCardButton />
        </div>
      </div>

      {/* 🎬 AnimatePresence for Address Modal */}
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
              {/* 👇 Your address card component */}
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
              {/* 👇 Your slot card component */}
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
