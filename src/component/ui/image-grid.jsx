import React from "react";
import MainImage from "../../assets/main_image.png";

const ImageGrid = () => {
  return (
    <section className="p-6 m-20">
      <div className="">
        <img
          src={MainImage}
          alt="Women's Salon"
          className="w-full h-full object-cover rounded-[15px]"
        />
      </div>
    </section>
  );
};

export default ImageGrid;
