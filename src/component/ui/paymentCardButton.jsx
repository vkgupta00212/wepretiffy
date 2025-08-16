// PaymentCardButton.jsx
import React from "react";

const PaymentCardButton = ({
  discountFee,
  itemTotal,
  surgeCharge,
  taxesAndFee,
  calculateTotal,
}) => {
  const totalBeforeTip = calculateTotal();

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <h2 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">
        Payment Summary
      </h2>
      <div className="space-y-3 text-sm text-gray-700">
        {/* Item Total */}
        <div className="flex justify-between items-center">
          <span className="font-medium">Item Total</span>
          <div className="flex items-center gap-2">
            <span className="line-through text-gray-400 text-xs">
              ₹{discountFee}
            </span>
            <span className="text-gray-900 font-semibold">₹{itemTotal}</span>
          </div>
        </div>
        {/* Surge Charge */}
        <div className="flex justify-between items-center">
          <span className="hover:text-indigo-500 transition-colors underline decoration-indigo-200 underline-offset-4">
            Surge Charge
          </span>
          <span className="text-gray-900 font-medium">₹{surgeCharge}</span>
        </div>
        {/* Taxes */}
        <div className="flex justify-between items-center">
          <span className="hover:text-indigo-500 transition-colors underline decoration-indigo-200 underline-offset-4">
            Taxes & Fees
          </span>
          <span className="text-gray-900 font-medium">₹{taxesAndFee}</span>
        </div>
        <hr className="my-3 border-gray-200" />
        {/* Total */}
        <div className="flex justify-between items-center font-semibold text-gray-800">
          <span>Total Amount</span>
          <span className="text-indigo-500">₹{totalBeforeTip}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentCardButton;
