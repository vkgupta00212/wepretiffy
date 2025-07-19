import React from "react";
import { Card, CardContent } from "../ui/card";
import icon from "../../assets/facemask.png";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { MdPayment } from "react-icons/md";


const PaymentCard = () => {
  return (
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
            <button className="p-3 rounded-[7px] text-white text-[16px] font-medium">
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
            <button className="p-3 rounded-[7px] text-white text-[16px] font-normal">
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
              {/* <span className="text-[14px] font-normal text-black leading-tight mt-[6px]">
                +91 7700818001
              </span> */}
            </div>
          </div>

          <div className="w-full rounded-md bg-violet-700 text-center mt-5">
            <button className="p-3 rounded-[7px] text-white text-[16px] font-normal">
               Proceed Payment
            </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
