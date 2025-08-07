import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ total, cartItems }) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640); // Tailwind md breakpoint

  const handleCart = () =>
    navigate("/paymentpage", { state: { cartItems, total } });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!cartItems || cartItems.length === 0) {
    return null; // Do not show summary if cart is empty
  }

  const MobileSummary = () => (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-300 shadow-lg">
      <button
        onClick={handleCart}
        className="w-full flex items-center justify-between bg-[#7c3aed] text-white px-5 py-3 rounded-lg shadow hover:bg-[#6b21a8] transition"
      >
        <span className="text-base font-semibold">
          Total Items:{cartItems.length}
        </span>
        <span className="text-base font-semibold">View Cart</span>
      </button>
    </div>
  );

  const DesktopSummary = () => (
    <div className="w-full p-4 bg-white border-t border-gray-200">
      <button
        onClick={handleCart}
        className="w-full flex items-center justify-between bg-[#7c3aed] text-white px-6 py-3 rounded-md shadow hover:bg-[#6b21a8] transition"
      >
        <span className="text-lg font-semibold">₹{total.toFixed(2)}</span>
        <span className="text-lg font-semibold">View Cart</span>
      </button>
    </div>
  );

  return isMobile ? <MobileSummary /> : <DesktopSummary />;
};

export default CartSummary;
