import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";

const PaymentCardButton = () => {
  const [selectedTip, setSelectedTip] = useState(75);

  const handleTipSelection = (tip) => {
    setSelectedTip(tip);
  };

  return (
    <div className="w-full max-w-[400px] p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      {/* Payment Summary */}
      <div className="mb-4  space-y-2">
        <h2 className="text-lg font-semibold mb-4">Payment summary</h2>
        <div className="flex justify-between text-sm mb-1">
          <span>Item total</span>
          <span className="line-through text-gray-400">₹1,588</span>
          <span className="text-black font-medium ml-2">₹1,509</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-700 underline">Surge charge</span>
          <span>₹200</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-700 underline">Taxes and Fee</span>
          <span>₹79</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total amount</span>
          <span>₹1,788</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Amount to pay</span>
          <span>₹1,788</span>
        </div>
      </div>

      {/* Tip Section */}
      <div className="mb-4  space-y-5">
        <h3 className="font-medium mb-2">
          Add a tip to thank the Professional
        </h3>
        <div className="flex flex-wrap gap-3">
          {[50, 75, 100].map((amount) => (
            <button
              key={amount}
              onClick={() => handleTipSelection(amount)}
              className={`px-4 py-2 border rounded-md ${
                selectedTip === amount
                  ? "bg-violet-100 border-violet-600 text-violet-700 font-semibold"
                  : "border-gray-300"
              }`}
            >
              ₹{amount}
              {amount === 75 && (
                <div className="text-xs text-green-600 font-medium">
                  POPULAR
                </div>
              )}
            </button>
          ))}
          <button
            onClick={() => handleTipSelection("custom")}
            className={`px-4 py-2 border rounded-md ${
              selectedTip === "custom"
                ? "bg-violet-100 border-violet-600 text-violet-700 font-semibold"
                : "border-gray-300"
            }`}
          >
            Custom
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCardButton;
