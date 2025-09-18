import { useState } from "react";
import { Phone, X } from "lucide-react";

const LoginCard = ({ onClose, onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const isValid = phoneNumber.length === 10;

  const handleContinue = async () => {
    if (!isValid || loading) return;

    setLoading(true);
    try {
      localStorage.setItem("userPhone", phoneNumber);
      // Instead of navigation, call parent callback
      onSubmit(phoneNumber);
    } catch (error) {
      console.error("Error saving phone number:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100 font-sans transition-all duration-300 hover:shadow-2xl">
      {/* Close Button (X) */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="mb-6">
        <Phone className="w-8 h-8 mb-3 text-indigo-600" />
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Enter your phone number
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          We'll send you a text with a verification code.
        </p>
      </div>

      {/* Phone Input */}
      <div className="flex mb-6">
        <select className="border border-gray-200 rounded-l-lg px-4 py-3 text-sm bg-gray-50/50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300">
          <option value="+91">+91</option>
          <option value="+1">+1</option>
          <option value="+44">+44</option>
        </select>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            const onlyNums = e.target.value.replace(/\D/g, "");
            setPhoneNumber(onlyNums.slice(0, 10));
          }}
          placeholder="Enter your phone number"
          className="flex-1 border border-gray-200 rounded-r-lg px-4 py-3 text-sm bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
        />
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!isValid || loading}
        className={`w-full py-3 px-4 rounded-lg font-semibold focus:outline-none transition-all duration-300 ${
          isValid && !loading
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {loading ? "Processing..." : "Continue"}
      </button>

      {/* T&C Notice */}
      <div className="mt-5 text-xs text-center text-gray-600">
        By continuing, you agree to our{" "}
        <a
          href="#"
          className="underline font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
        >
          T&amp;C
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="underline font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
        >
          Privacy
        </a>{" "}
        policy.
      </div>
    </div>
  );
};

export default LoginCard;
