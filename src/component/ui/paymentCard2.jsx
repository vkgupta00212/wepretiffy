import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const PackageCard = () => {
  return (
    <div className="w-full max-w-[400px] p-4 bg-white border border-gray-300 rounded-md shadow-sm mb-6">
      {/* Title and Price Row */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold mb-2">Complete waxing (tin)</h3>
        </div>

        {/* Quantity and Price */}
        <div className="flex flex-col items-end">
          {/* Quantity Control */}
          <div className="flex items-center border border-purple-300 rounded-lg px-2 py-1 text-purple-600 font-medium text-sm mb-1">
            <FaMinus className="cursor-pointer" />
            <span className="mx-3">1</span>
            <FaPlus className="cursor-pointer" />
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-black font-semibold text-sm">₹1,509</p>
            <p className="line-through text-gray-400 text-xs">₹1,580</p>
          </div>
        </div>
      </div>

      {/* Package Items */}
      <ul className="mt-2 ml-4 text-sm text-gray-700 list-disc space-y-1">
        <li>RICA gold x1</li>
        <li>RICA gold x1</li>
      </ul>

      {/* Edit Package */}
      <p className="mt-3 text-sm font-medium text-blue-600 underline cursor-pointer">
        Edit package
      </p>
    </div>
  );
};

export default PackageCard;
