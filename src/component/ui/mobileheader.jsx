import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetOrder from "../../backend/order/getorderid";

const CartWithBadge = ({ count }) => (
  <div
    className="relative cursor-pointer transition-transform hover:scale-110"
    aria-label={`Shopping cart with ${count} items`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6 text-gray-800"
      viewBox="0 0 24 24"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>

    {count > 0 && (
      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
        {count}
      </div>
    )}
  </div>
);

const MobileHeader = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const userID = localStorage.getItem("userPhone");

  useEffect(() => {
    const fetchOrder = async () => {
      if (!userID) {
        setCartCount(0);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await GetOrder(userID, "Pending");

        if (response && typeof response === "object") {
          if ("items" in response && Array.isArray(response.items)) {
            setCartCount(response.items.length);
          } else if (Array.isArray(response)) {
            setCartCount(response.length);
          } else {
            setCartCount(0);
          }
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        setCartCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [userID]);

  return (
    <header className="flex items-center justify-between p-3 bg-white shadow-md sm:p-4">
      <div className="flex items-center flex-1 min-w-0 gap-2">
        <div className="flex flex-col flex-1 min-w-0">
          <h1 className="text-lg font-bold text-gray-900 sm:text-xl text-start">
            Home
          </h1>
          {isLoading ? (
            <div className="w-3/4 h-4 mt-1 bg-gray-200 rounded animate-pulse" />
          ) : (
            <button
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 mt-1 max-w-[85%] sm:max-w-[90%]"
              title="546, Block 2, Kirti Nagar Industrial Area, Kirti Nagar, New Delhi, Delhi, India"
              aria-label="Change delivery address"
            >
              <span className="truncate">
                546, Block 2, Kirti Nagar Industrial Area, Kirti ...
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <button
        onClick={() => navigate("/cartpage")}
        className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Go to cart"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
        ) : (
          <CartWithBadge count={cartCount} />
        )}
      </button>
    </header>
  );
};

export default MobileHeader;
