import { useState, useEffect, useRef } from "react";
import { X, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RegisterUser from "../../backend/authentication/register";
import GetUser from "../../backend/authentication/getuser";

const OtpVerification = ({ onVerify }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(30); // seconds countdown
  const inputsRef = useRef([]);
  const phone = localStorage.getItem("userPhone");
  const navigate = useNavigate();

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle OTP input
  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/, ""); // only numbers allowed

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input automatically if a number is entered
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle backspace deletion
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // Prevent browser navigation
      let newOtp = [...otp];

      if (otp[index]) {
        // If current box has a value → clear it
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous box if empty
        inputsRef.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleSubmit = async () => {
    if (!isOtpComplete) return;
    const code = otp.join("");

    // ✅ Only allow correct OTP
    if (code !== "123456") {
      alert("Invalid OTP");
      return;
    }

    onVerify && onVerify(code);

    try {
      const userData = await GetUser(phone);

      if (userData && userData.length > 0) {
        alert("User is already registered");
      } else {
        await RegisterUser(phone);
        alert("Registration successful");
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userPhone", phone);

      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 50);
    } catch (error) {
      console.error("Error during verification:", error);
      alert("Something went wrong during verification.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4"
          onClick={() => navigate("/")}
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <span className="bg-blue-100 p-3 rounded-full">📲</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-2">
          Enter verification code
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          A 6-digit verification code has been sent to{" "}
          <strong>+91{phone}</strong>
        </p>

        {/* OTP boxes */}
        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-10 h-12 text-center border border-gray-300 rounded-md text-lg focus:border-purple-500 focus:outline-none"
            />
          ))}
        </div>

        {/* Timer */}
        <div className="flex justify-center items-center gap-1 text-sm text-gray-500 mb-6">
          <Clock className="w-4 h-4" />
          {`00:${timeLeft.toString().padStart(2, "0")}`}
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!isOtpComplete}
          className={`w-full py-2 rounded-md font-medium transition-colors ${
            isOtpComplete
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-gray-300 text-white cursor-not-allowed"
          }`}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
