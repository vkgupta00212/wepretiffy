import React from "react";
import { Minus, Plus } from "lucide-react";

const PaymentCard2 = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  calculateTotal,
}) => {
  const totalAmount = calculateTotal();

  return (
    <div className="max-w-3xl w-full mx-auto font-sans">
      <div className="bg-white p-4 sm:p-6 rounded-[8px] border border-gray-300">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
          Your Cart
        </h2>

        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4 border-b pb-4"
            >
              {/* Left side: Info */}
              <div className="flex-1">
                <p className="text-sm sm:text-base font-medium text-gray-800">
                  {item.title}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {item.description}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-purple-600 hover:text-purple-800 text-sm mt-2"
                >
                  Remove
                </button>
              </div>

              {/* Right side: Quantity and price */}
              <div className="flex flex-col items-start sm:items-end">
                <div className="flex items-center border border-purple-400 text-purple-600 rounded-lg px-3 py-1 gap-3 text-sm font-medium">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="hover:text-purple-800"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="hover:text-purple-800"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className="text-md sm:text-lg font-semibold mt-2 text-gray-800">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {/* You can optionally render CartSummary here */}
    </div>
  );
};

export default PaymentCard2;
