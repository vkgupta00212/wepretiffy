import React from "react";
import { Minus, Plus } from "lucide-react";
import CartSummary from "./cartsummury";

const CartPage = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  calculateTotal,
}) => {
  return (
    <div className="lg:w-[350px] mx-auto p-4 font-sans">
      <div className="bg-white p-4 rounded-t-[5px] border border-gray-300">
        <h2 className="text-xl font-semibold mb-4">Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start mb-4"
            >
              <div>
                <p className="text-sm font-medium">{item.servicename}</p>
                {/* Optionally display duration */}
                {item.duration && (
                  <p className="text-xs text-gray-500">{item.duration}</p>
                )}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-purple-600 text-sm mt-1"
                >
                  Remove
                </button>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center border border-purple-400 text-purple-600 rounded-lg px-2 py-1 gap-3 text-sm font-medium">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className="text-md font-semibold mt-2">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="border border-gray-300 rounded-b-[5px]">
          <CartSummary total={calculateTotal()} cartItems={cartItems} />
        </div>
      )}
    </div>
  );
};

export default CartPage;
