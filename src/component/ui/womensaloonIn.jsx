import React from "react";
import SelectServiceCard from "./select-service";
import PackageMain from "./package-card";
import CartCard from "./cartCard";

const WomenSaloonIn = () => {
  return (
    <div className="mt-[55px] h-[calc(100vh-55px)] px-4 md:px-8">
      <div className="flex flex-row lg:flex-row gap-6 lg:gap-[30px] h-full">
        {/* Left: Select Services - Fixed */}
        <div className="flex-shrink-0">
          <SelectServiceCard />
        </div>

        {/* Center: Scrollable PackageMain */}
        <div className="  mt-4 lg:mt-[30px] overflow-y-auto scrollbar-hide max-h-full">
          <PackageMain />
        </div>

        {/* Right: Cart Cards */}
        <div className="order-3 lg:mt-[70px] overflow-y-auto scrollbar-hide max-h-full">
          <CartCard />
          <div className="mt-[10px]">
            <CartCard />
          </div>
          <div className="mt-[10px]">
            <CartCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WomenSaloonIn;
