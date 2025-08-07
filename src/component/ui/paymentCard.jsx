import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { MdPayment } from "react-icons/md";

const PaymentCard = ({ onSelectAddress, onSelectSlot, onProceedPayment }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const isLoggedIn = false;

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
      setIsLaptop(window.innerWidth >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const desktop = (
    <div className="py-10 w-full max-w-[100%] sm:max-w-[90%] md:max-w-[100%] lg:max-w-[600px] mx-auto">
      <div className="border border-gray-300 rounded-[5px] p-4 sm:p-6 flex flex-col sm:mt-[60px] gap-6 sm:gap-[20px]">
        {/* Top Location Info */}
        <div className="flex items-center gap-4 sm:gap-[20px]">
          <Card className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] rounded-[5px] border border-gray-300 flex items-center justify-center">
            <CardContent className="p-0 w-full h-full flex items-center justify-center">
              <FaLocationDot className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-gray-700" />
            </CardContent>
          </Card>
          <div className="flex flex-col">
            <span className="text-sm sm:text-[14px] font-medium text-black leading-tight">
              Send booking details to
            </span>
            <span className="text-sm sm:text-[14px] font-normal text-black leading-tight mt-1">
              +91 7700818001
            </span>
          </div>
        </div>

        <div className="border border-gray-300" />

        {/* Address Section */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 sm:gap-[20px]">
            <Card className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] rounded-xl border border-gray-300 flex items-center justify-center">
              <CardContent className="p-0 w-full h-full flex items-center justify-center">
                <FaLocationDot className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-gray-700" />
              </CardContent>
            </Card>
            <div className="flex flex-col">
              <span className="text-sm sm:text-[14px] font-medium text-black leading-tight">
                Address
              </span>
            </div>
          </div>
          <button
            className="w-full mt-4 p-3 bg-violet-700 text-white text-base rounded-md font-medium"
            onClick={onSelectAddress}
          >
            Select an address
          </button>
        </div>

        <div className="border border-gray-300" />

        {/* Slot Selection */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 sm:gap-[20px]">
            <Card className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] rounded-xl border border-gray-300 flex items-center justify-center">
              <CardContent className="p-0 w-full h-full flex items-center justify-center">
                <IoIosTime className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-gray-700" />
              </CardContent>
            </Card>
            <div className="flex flex-col">
              <span className="text-sm sm:text-[14px] font-medium text-black leading-tight">
                Slot
              </span>
            </div>
          </div>
          <button
            className="w-full mt-4 p-3 bg-violet-700 text-white text-base rounded-md font-normal"
            onClick={onSelectSlot}
          >
            Select Slot
          </button>
        </div>

        <div className="border border-gray-300" />

        {/* Payment Method */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 sm:gap-[20px]">
            <Card className="w-[44px] h-[44px] sm:w-[50px] sm:h-[50px] rounded-xl border border-gray-300 flex items-center justify-center">
              <CardContent className="p-0 w-full h-full flex items-center justify-center">
                <MdPayment className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] text-gray-700" />
              </CardContent>
            </Card>
            <div className="flex flex-col">
              <span className="text-sm sm:text-[14px] font-medium text-black leading-tight">
                Payment Method
              </span>
            </div>
          </div>
          <button
            onClick={onProceedPayment}
            className="w-full mt-5 p-3 bg-violet-700 text-white text-base rounded-md font-normal"
          >
            Proceed Payment
          </button>
        </div>
      </div>
    </div>
  );
  const mobile = (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-inherit border-t border-gray-300 shadow-lg">
      <button
        className="w-full flex items-center justify-center bg-[#7c3aed] text-white px-5 py-3 rounded-lg shadow hover:bg-[#6b21a8] transition"
        onClick={() => {
          if (!isLoggedIn) {
            // Redirect to login page
            window.location.href = "/login"; // or use navigate('/login') if using react-router
          } else {
            // Open Add Address & Slot modal or navigate
            console.log("Add address and slot clicked");
          }
        }}
      >
        <span className="font-semibold text-center">
          {isLoggedIn ? "Add address and slot" : "Login to continue"}
        </span>
      </button>
    </div>
  );

  return <>{isMobile ? mobile : desktop}</>;
};

export default PaymentCard;
