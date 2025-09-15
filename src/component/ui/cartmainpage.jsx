import React from "react";
import CartPage from "./cartpage";

const CartMain = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4 sm:p-8 lg:p-12">
      {/* Header Section */}
      <header className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
          Your Shopping Cart
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Review your items and proceed to checkout
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <CartPage />
      </main>

      {/* Footer Section */}
      <footer className="mt-8 w-full max-w-4xl text-center">
        <p className="text-sm text-gray-500">
          Need help?{" "}
          <a href="/support" className="text-blue-600 hover:underline">
            Contact Support
          </a>
        </p>
      </footer>
    </div>
  );
};

export default CartMain;
