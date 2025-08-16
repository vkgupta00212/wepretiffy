// PaymentCard2.jsx
import React from "react";
import { Minus, Plus } from "lucide-react";

const PaymentCard2 = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  calculateTotal,
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-5 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <h2 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-center">
        Your Cart
      </h2>

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex md:flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4 border-b border-gray-200 pb-4"
          >
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">
                {item.servicename}
              </p>
              {item.duration && (
                <p className="text-xs text-gray-600 mt-1">{item.duration}</p>
              )}
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center border border-indigo-200 bg-indigo-50 rounded-full px-2 py-1 gap-2 text-xs font-medium hover:border-indigo-300 transition-all">
                <span className="w-5 text-center font-semibold">
                  {item.quantity}
                </span>
              </div>
              <p className="text-sm font-bold mt-2 text-gray-900">
                ₹{item.price * item.quantity}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-sm py-4">
          Your cart is empty.
        </p>
      )}
    </div>
  );
};

export default PaymentCard2;
