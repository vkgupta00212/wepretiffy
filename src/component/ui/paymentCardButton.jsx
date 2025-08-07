import React from "react";

const PaymentCardButton = ({
  itemTotal,
  surgeCharge,
  taxesAndFee,
  calculateTotal,
}) => {
  const totalBeforeTip = calculateTotal();
  const totalToPay = totalBeforeTip;

  return (
    <div className="w-full sm:max-w-[400px] p-6 bg-white border border-gray-200 rounded-[8px] ">
      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        Payment Summary
      </h2>

      {/* Summary Items */}
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Item Total</span>
          <div className="flex items-center space-x-2">
            <span className="line-through text-gray-400">₹{itemTotal}</span>
            <span className="text-gray-900 font-medium">₹{itemTotal}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="underline">Surge Charge</span>
          <span className="text-gray-900">₹{surgeCharge}</span>
        </div>

        <div className="flex justify-between">
          <span className="underline">Taxes and Fees</span>
          <span className="text-gray-900">₹{taxesAndFee}</span>
        </div>

        <hr className="my-3 border-gray-300 w-[300px]" />

        <div className="flex justify-between font-semibold text-gray-800">
          <span>Total Amount</span>
          <span>₹{totalBeforeTip}</span>
        </div>

        <div className="flex justify-between font-bold text-lg text-gray-900">
          <span>Amount to Pay</span>
          <span>₹{totalToPay}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentCardButton;
