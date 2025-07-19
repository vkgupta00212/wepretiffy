import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import image1 from "../../assets/serviceAdd.png";
import { Card, CardContent } from "../ui/card";

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

// Rename component for clarity
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
    <div className=" gap-[40px] justify-between items-center w-full mx-auto p-2">
      <div className="flex flex-col">
        <div>
          <Card className="w-[500px]  rounded-xl overflow-hidden border border-black-200 flex items-center justify-center">
            <CardContent className="p-0 flex items-center justify-center w-full h-full">
              <img
                src={image}
                alt={"image"}
                className="w-full h-full object-contain p-[0px]"
              />
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 flex flex-row">
          <div className="space-y-2 flex-1">
            <h2 className="text-lg font-semibold text-black">{title}</h2>

            {/* Rating + Reviews */}
            <div className="flex items-center text-sm text-gray-600">
              <span className="text-purple-600 font-bold mr-1">
                ★ {rating.toFixed(2)}
              </span>
              <span className="underline cursor-pointer text-xs">
                ({reviews} reviews)
              </span>
            </div>

            {/* Price & Duration */}
            <div className="flex items-center gap-3 text-sm font-medium text-black">
              <span>₹{price}</span>
              {originalPrice && (
                <span className="line-through text-gray-500">
                  ₹{originalPrice}
                </span>
              )}
              <span className="text-gray-600">• {duration}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700">
              <span className="text-blue-700 font-medium">View details</span>
            </p>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-3">
              <button
                onClick={onEdit}
                className="text-sm px-4 py-1 border rounded-md font-medium hover:bg-gray-100"
              >
                Edit your package
              </button>
            </div>
          </div>

          <div className="">
            <button
              onClick={onAdd}
              className="text-sm px-4 py-1 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const handleAddCart = () => {};

// Usage Component
const PackageCard = () => {
  const navigate = useNavigate();

  const handleAddCart = (pkg) => {
    navigate("/paymentpage", { state: pkg });
  };

  return (
    <div className="border rounded-[5px] border-black-200 mt-10 bg-white">
      <div className=" mx-auto p-[30px]">
        <div className="text-[30px] font-semibold text-black mb-5">
          <span>Package</span>
        </div>
        {packages.map((pkg, index) => (
          <div className="mb-10">
            <PackageCardItem
              key={index}
              title={pkg.title}
              subtitle={pkg.subtitle}
              rating={pkg.rating}
              reviews={pkg.reviews}
              price={pkg.price}
              originalPrice={pkg.originalPrice}
              duration={pkg.duration}
              description={pkg.description}
              onEdit={() => alert("Edit clicked for ${pkg.title}")}
              image={pkg.image}
              onAdd={() => handleAddCart(pkg)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageCard;
