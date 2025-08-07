import { useState, useEffect } from "react";
import { Phone, LoaderCircle } from "lucide-react";

const LoginCard = () => {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="mb-4">
        <Phone className="w-6 h-6 mb-2 text-black" />
        <h2 className="text-2xl font-semibold">Enter your phone number</h2>
        <p className="text-sm text-gray-600">
          We'll send you a text with a verification code.
        </p>
      </div>

      <div className="flex mb-4">
        <select className="border border-gray-300 rounded-l-md px-3 py-2 text-sm bg-white">
          <option value="+91">+91</option>
          <option value="+1">+1</option>
          <option value="+44">+44</option>
        </select>
        <input
          type="tel"
          placeholder="Enter your phone number"
          className="flex-1 border-t border-b border-r border-gray-300 rounded-r-md px-3 py-2 text-sm focus:outline-none"
        />
      </div>

      {/* <div className="flex items-center space-x-2 mb-4 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md">
        <LoaderCircle className="w-5 h-5 animate-spin text-green-600" />
        <span className="text-sm text-gray-700">Verifying...</span>
      </div> */}

      <button className="w-full bg-gray-300 text-white py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400 hover:cursor-pointer">
        Continue
      </button>

      <div className="mt-4 text-xs text-center text-gray-500">
        By continuing, you agree to our{" "}
        <a href="#" className="underline font-medium">
          T&amp;C
        </a>{" "}
        and{" "}
        <a href="#" className="underline font-medium">
          Privacy
        </a>{" "}
        policy.
      </div>
    </div>
  );
};

export default LoginCard;
