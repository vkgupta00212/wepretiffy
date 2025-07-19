import React from "react";
import MainImage from "../../assets/main_image.png";

const ImageGrid = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={MainImage}
        alt="Women's Salon"
        className="w-full h-full max-w-full max-h-full object-cover rounded-2xl shadow-lg border border-gray-200"
        style={{ aspectRatio: "5/2" }}
      />
    </div>
  );
};

export default ImageGrid;
