import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SelectServiceCardSection from "./select-service";
import PackageMain from "./package-card";
import CartPage from "./cartpage";
import CartSummary from "./cartsummury";

const WomenSaloonIn = () => {
  const location = useLocation();
  const { subService } = location.state || {};

  const [cartItems, setCartItems] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const [selectedServiceTab, setSelectedServiceTab] = useState(null);

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
      setIsLaptop(width >= 1024);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const addToCart = (item) => {
    const price = parseInt(item.discountfee || item.fees || 0);
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1, price }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const calculateTotal = () =>
    cartItems.reduce(
      (acc, i) => acc + parseInt(i.discountfee || i.fees || 0) * i.quantity,
      0
    );

  return (
    <div className="mt-[55px] px-4 md:px-6 lg:px-[120px] md:mt-[100px] lg:mt-[130px]">
      <div className="flex flex-col md:flex-row lg:flex-row gap-4 lg:gap-6 h-full">
        {/* ✅ Sidebar Section */}
        <div className="flex flex-col gap-4 flex-shrink-0">
          {/* ✅ Display the selected service name */}

          <SelectServiceCardSection
            subService={subService}
            selectedSubService={selectedServiceTab}
            onChangeSubService={(newTab) => setSelectedServiceTab(newTab)}
          />

          {isMobile && (
            <PackageMain
              addToCart={addToCart}
              selectedServiceTab={selectedServiceTab}
            />
          )}

          {isTablet && (
            <CartPage
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              calculateTotal={calculateTotal}
            />
          )}
        </div>

        {/* ✅ Main Package Section */}
        <div className="flex-grow max-h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar px-[1px] sm:px-[1px]">
          {!isMobile && (
            <PackageMain
              addToCart={addToCart}
              selectedServiceTab={selectedServiceTab}
            />
          )}
        </div>

        {/* ✅ Right Cart Section (Laptop/Desktop Only) */}
        {isLaptop && (
          <div className="mt-[30px] lg:block flex-shrink-0">
            <CartPage
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              calculateTotal={calculateTotal}
            />
          </div>
        )}
      </div>

      {/* ✅ Bottom Summary for Mobile */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 w-full z-50 block lg:hidden">
          <CartSummary total={calculateTotal()} cartItems={cartItems} />
        </div>
      )}
    </div>
  );
};

export default WomenSaloonIn;
