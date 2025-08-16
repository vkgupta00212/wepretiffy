import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import CartSummary from "./cartsummury";

const CartPage = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  calculateTotal,
}) => {
  return (
    <div className="w-full md:w-80 lg:w-96 mx-auto bg-white rounded-2xl shadow-lg overflow-hidden font-sans">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
          Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 sm:py-12">
            <p className="text-gray-500 text-base sm:text-lg mb-2">
              Your cart is empty
            </p>
            <p className="text-gray-400 text-sm">
              Add some services to get started!
            </p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-100 last:mb-0 last:pb-0 last:border-0"
            >
              <div className="flex-grow pr-3 sm:pr-4">
                <p className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2">
                  {item.servicename}
                </p>
                {item.duration && (
                  <p className="text-xs text-gray-500 mt-1">{item.duration}</p>
                )}
                <button
                  onClick={() => {
                    console.log("Removing item:", item.id); // Debugging
                    removeFromCart(item.id);
                  }}
                  className="flex items-center text-indigo-600 text-sm mt-2 hover:text-indigo-800 transition-colors duration-200"
                >
                  <Trash2 size={14} className="mr-1" />
                  Remove
                </button>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center bg-gray-50 rounded-full px-2 py-1 gap-2 sm:gap-3 text-sm font-medium text-gray-700 shadow-sm">
                  <button
                    onClick={() => {
                      console.log("Decreasing quantity:", item.id); // Debugging
                      updateQuantity(item.id, item.quantity - 1);
                    }}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-6 sm:w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => {
                      console.log("Increasing quantity:", item.id); // Debugging
                      updateQuantity(item.id, item.quantity + 1);
                    }}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className="text-base sm:text-lg font-bold text-indigo-600 mt-2 sm:mt-3">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-white">
          <CartSummary total={calculateTotal()} cartItems={cartItems} />
        </div>
      )}
    </div>
  );
};

export default CartPage;
