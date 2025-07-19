import React from "react";
import SelectServiceCard from "./select-service";
import PackageMain from "./package-card";
import CartCard from "./cartCard";

const WomenSaloonIn = () => {
  return (
    <div className="mt-[55px] h-[calc(100vh-55px)]">
      {" "}
      {/* Full height minus top margin */}
      <div className="flex gap-[30px] ml-[100px] h-full">
        {/* Left: Select Services - Fixed */}
        <div className="flex-shrink-0">
          <SelectServiceCard />
        </div>

        {/* Right: Scrollable PackageMain - stays in place */}
        <div className="mt-[30px] overflow-y-auto max-h-full scrollbar-hide">
          <PackageMain />
        </div>

        <div className="mt-[70px] overflow-y-auto max-h-full">
          <div className="">
            <CartCard />
          </div>
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
