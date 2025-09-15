import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetOrder from "../../backend/order/getorderid";

const CartWithBadge = ({ count }) => (
  <div style={{ position: "relative", cursor: "pointer" }}>
    {/* Shopping cart icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={{ color: "#333" }}
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>

    {count > 0 && (
      <div
        style={{
          position: "absolute",
          top: -6,
          right: -6,
          backgroundColor: "red",
          borderRadius: "50%",
          width: 18,
          height: 18,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: 12,
          fontWeight: "bold",
          border: "2px solid white",
          boxSizing: "content-box",
        }}
      >
        {count}
      </div>
    )}
  </div>
);

const MobileHeader = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const userID = localStorage.getItem("userPhone");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await GetOrder(userID, "Pending"); // 👈 depends on how your GetOrder is written
        if (response && response.items) {
          setCartCount(response.items.length);
        } else if (Array.isArray(response)) {
          setCartCount(response.length);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        setCartCount(0);
      }
    };

    fetchOrder();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1px",
        gap: "20px",
      }}
    >
      {/* Address Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
          textAlign: "start",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: 16, color: "#222" }}>
          Home
        </div>
        <div
          style={{
            fontSize: 13,
            color: "#555",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "flex",
            alignItems: "start",
            gap: 4,
            cursor: "pointer",
            marginTop: 2,
          }}
          title="546, Block 2, Kirti Nagar Industrial Area, Kirti Nagar, New Delhi, Delhi, India"
        >
          546, Block 2, Kirti Nagar Industrial Area, Kirti ...
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Cart Section */}
      <div
        onClick={() => navigate("/cartpage")}
        className="w-11 h-11 flex items-center justify-center rounded-full cursor-pointer border border-gray-400 text-gray-800"
      >
        <CartWithBadge count={cartCount} />
      </div>
    </div>
  );
};

export default MobileHeader;
