import React from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/serviceAdd.png";
import { Card, CardContent } from "../ui/card";

// Sample package data
const packages = [
  {
    image: image1,
    title: "Complete waxing (tin)",
    subtitle: "Package",
    rating: 4.91,
    reviews: "494K",
    price: "1509",
    originalPrice: "1580",
    duration: "1 hr 15 mins",
    description:
      "Full arms (including underarms) - RICA gold, Full legs - RICA gold",
  },
];

// Individual package card item
const PackageCardItem = ({
  image,
  title,
  rating,
  reviews,
  price,
  originalPrice,
  duration,
  description,
  onEdit,
  onAdd,
}) => {
  return (
    <div className="w-full rounded-2xl border border-gray-200 shadow-md bg-white p-4 transition-transform duration-200 hover:scale-[1.01]">
      {/* Image */}
      <div className="mb-4">
        <Card className="rounded-xl overflow-hidden shadow-sm">
          <CardContent className="p-0">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
          </CardContent>
        </Card>
      </div>

      {/* Info */}
      <div className="space-y-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          {title}
        </h2>

        <div className="flex items-center text-sm text-gray-600">
          <span className="text-purple-600 font-semibold mr-1">
            ★ {rating.toFixed(2)}
          </span>
          <span className="underline text-xs cursor-pointer hover:text-purple-500">
            ({reviews} reviews)
          </span>
        </div>

        {/* Price & Duration */}
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-800">
          <span>₹{price}</span>
          {originalPrice && (
            <span className="line-through text-gray-500">₹{originalPrice}</span>
          )}
          <span className="text-gray-500">• {duration}</span>
        </div>

        {/* View Details */}
        <p className="text-sm text-gray-600">
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            View details
          </span>
        </p>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={onEdit}
            className="text-sm px-4 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
          >
            Edit Package
          </button>
          <button
            onClick={onAdd}
            className="text-sm px-4 py-1 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

// Main package list component
const PackageCard = () => {
  const navigate = useNavigate();

  const handleAddCart = (pkg) => {
    navigate("/paymentpage", { state: pkg });
  };

  return (
    <div className="w-full px-4 md:px-8 py-10 bg-gray-50">
      <div className="w-full mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Packages
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {packages.map((pkg, index) => (
            <PackageCardItem
              key={index}
              {...pkg}
              onEdit={() => alert(`Edit clicked for ${pkg.title}`)}
              onAdd={() => handleAddCart(pkg)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
