import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SuggestedAnalyzecard from "./suggestanalyzecard";
import CartPage from "./cartpage";
import CartSummary from "./cartsummury";

const SuggestAnalyze = () => {
  const location = useLocation();
  const { subService } = location.state || {};

  const [cartItems, setCartItems] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Tailwind md:768px
      setIsTablet(width >= 768 && width < 1024); // Tailwind md to lg
      setIsLaptop(width >= 1024); // Tailwind lg:1024px
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const addToCart = (item) => {
    if (!item || !item.id) {
      console.error("Invalid item:", item);
      return;
    }
    const price = parseFloat(item.discountfee || item.fees || 0);
    console.log("Adding item to cart:", { ...item, price }); // Debugging
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1, price }];
    });
  };

  const removeFromCart = (id) => {
    console.log("Removing item with id:", id); // Debugging
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id, qty) => {
    console.log("Updating quantity for id:", id, "to", qty); // Debugging
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (acc, i) => acc + (i.price || 0) * i.quantity,
      0
    );
    console.log("Calculated total:", total); // Debugging
    return total; // Return number
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen pt-16 sm:pt-20 md:pt-24 lg:pt-28 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-10 tracking-tight">
          {subService ? `${subService} Packages` : "Skin Analysis Packages"}
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-10">
          {/* Main Package Section */}
          <div className="flex-grow max-h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar">
            <SuggestedAnalyzecard
              addToCart={addToCart}
              serviceId={subService || "2"}
            />
          </div>

          {/* Cart Section (Tablet and Laptop) */}
          {(isTablet || isLaptop) && (
            <div className="flex-shrink-0 w-full md:w-80 lg:w-96">
              <div className="sticky top-24">
                <CartPage
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  calculateTotal={calculateTotal}
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Summary for Mobile */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50 border-t border-gray-200">
            <CartSummary total={calculateTotal()} cartItems={cartItems} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestAnalyze;
