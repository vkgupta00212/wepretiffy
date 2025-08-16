import React, { useEffect, useState } from "react";
import CourseCard from "./coursecard";

const Course = () => {
  //   const addToCart = (item) => {
  //     const price = parseInt(item.discountfee || item.fees || 0);
  //     setCartItems((prev) => {
  //       const exists = prev.find((i) => i.id === item.id);
  //       if (exists) {
  //         return prev.map((i) =>
  //           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
  //         );
  //       } else {
  //         return [...prev, { ...item, quantity: 1, price }];
  //       }
  //     });
  //   };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
      <CourseCard />
    </div>
  );
};

export default Course;
