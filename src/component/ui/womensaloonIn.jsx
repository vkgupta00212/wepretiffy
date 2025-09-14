import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import SelectServiceCardSection from "./select-service";
import PackageMain from "./package-card";
import CartPage from "./cartpage";
import CartSummary from "./cartsummury";
import GetOrderid from "../../backend/order/getorderid";
import InsertOrder from "../../backend/order/insertorder";

const WomenSaloonIn = () => {
  const location = useLocation();
  const { subService } = location.state || {};

  const [cartItems, setCartItems] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const [selectedServiceTab, setSelectedServiceTab] = useState(null);

  const UserID = localStorage.getItem("userPhone");

  // Handle screen size
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

  // Fetch existing pending order (once on mount)
  useEffect(() => {
    const fetchExistingOrder = async () => {
      try {
        if (!UserID) return;

        const orders = await GetOrderid(UserID, "Pending");

        if (orders && orders.length > 0) {
          setOrderId(orders[0].OrderID); // reuse existing order
          console.log("Existing order found:", orders[0].OrderID);
        } else {
          setOrderId(null); // will generate only on first add
          console.log("No existing order, will generate new one on first add");
        }
      } catch (err) {
        console.error("GetOrderid failed:", err);
      }
    };
    fetchExistingOrder();
  }, [UserID]);

  // Fetch packages (used for refresh after add)
  const [servicePackages, setServicePackages] = useState([]);
  const fetchPackages = useCallback(async () => {
    if (!selectedServiceTab?.SubCatid) return;
    try {
      const data = await import(
        "../../backend/servicepack/getservicepack"
      ).then((mod) => mod.default(selectedServiceTab.SubCatid));
      setServicePackages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch packages:", err);
    }
  }, [selectedServiceTab]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // Add item to cart + InsertOrder
  const addToCart = async (item) => {
    const price = parseInt(item.discountfee || item.fees || 0);

    // Update local cart UI
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

    try {
      let currentOrderId = orderId;

      if (!currentOrderId) {
        currentOrderId = `ORD${Date.now()}`;
        setOrderId(currentOrderId);
        console.log("Generated new order:", currentOrderId);
      }

      const orderPayload = {
        OrderID: currentOrderId,
        UserID: UserID,
        OrderType: "Service",
        ItemImages: "",
        ItemName: item.servicename || "",
        Price: price.toString(),
        Quantity: "1",
        Address: "",
        Slot: "",
        SlotDatetime: "",
        OrderDatetime: new Date().toISOString(),
      };

      const response = await InsertOrder(orderPayload);
      console.log("InsertOrder API Response:", response);

      // ✅ Refresh packages after adding
      fetchPackages();
    } catch (err) {
      console.error("InsertOrder failed:", err);
    }
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
        {/* Sidebar */}
        <div className="flex flex-col gap-4 flex-shrink-0">
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

        {/* Main Package Section */}
        <div className="flex-grow max-h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar px-[1px] sm:px-[1px]">
          <h1>UserID: {UserID}</h1>
          <h2>OrderID: {orderId || "Not generated yet"}</h2>
          {!isMobile && (
            <PackageMain
              addToCart={addToCart}
              selectedServiceTab={selectedServiceTab}
            />
          )}
        </div>

        {/* Right Cart Section */}
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

      {/* Bottom Summary */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 w-full z-50 block lg:hidden">
          <CartSummary total={calculateTotal()} cartItems={cartItems} />
        </div>
      )}
    </div>
  );
};

export default WomenSaloonIn;
