// PaymentCardButton.jsx
import React, { useMemo, useState } from "react";
import { Ticket, Sparkles } from "lucide-react";

const PaymentCardButton = ({
  discountFee = 0,
  itemTotal = 0,
  surgeCharge = 0,
  taxesAndFee = 0,
  calculateTotal = () => itemTotal + surgeCharge + taxesAndFee - discountFee,
  onProceed,
  loading = false,
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(null);

  const fmt = (v) => {
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(Number(v) || 0);
    } catch {
      return `₹${Number(v) || 0}`;
    }
  };

  const totalBeforeTip = useMemo(
    () => calculateTotal(),
    [calculateTotal, itemTotal, surgeCharge, taxesAndFee, discountFee]
  );

  const applyCoupon = () => {
    if (!coupon) return alert("Enter coupon code");
    const code = coupon.trim().toUpperCase();
    if (code === "SAVE50") {
      setCouponApplied({ code, value: 50, label: "Flat ₹50 off" });
      alert("Coupon applied: ₹50 off");
    } else if (code === "HALF10") {
      const val = Math.round((itemTotal * 10) / 100);
      setCouponApplied({ code, value: val, label: `10% off (₹${val})` });
      alert(`Coupon applied: ${fmt(val)} off`);
    } else {
      setCouponApplied(null);
      alert("Invalid coupon");
    }
    setCoupon("");
  };

  const finalTotal = useMemo(() => {
    const couponValue = couponApplied ? couponApplied.value : 0;
    const computed = Number(totalBeforeTip) - Number(couponValue);
    return computed > 0 ? computed : 0;
  }, [totalBeforeTip, couponApplied]);

  return (
    <div className="w-full max-w-md mx-auto p-5 bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50">
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Payment Summary</h3>
            <p className="text-xs text-gray-500">Review before proceeding</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Subtotal</div>
          <div className="text-lg font-semibold text-indigo-600">
            {fmt(finalTotal)}
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between items-center">
          <span className="font-medium">Item Total</span>
          <div className="flex items-center gap-3">
            <span className="line-through text-gray-400 text-xs">
              {fmt(discountFee)}
            </span>
            <span className="text-gray-900 font-semibold">
              {fmt(itemTotal)}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="hover:text-indigo-500 transition-colors underline decoration-indigo-200 underline-offset-4 cursor-default">
            Surge Charge
          </span>
          <span className="text-gray-900 font-medium">{fmt(surgeCharge)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="hover:text-indigo-500 transition-colors underline decoration-indigo-200 underline-offset-4 cursor-default">
            Taxes & Fees
          </span>
          <span className="text-gray-900 font-medium">{fmt(taxesAndFee)}</span>
        </div>

        {couponApplied && (
          <div className="flex justify-between items-center text-green-700">
            <span className="flex items-center gap-2">
              <Ticket className="w-4 h-4" /> {couponApplied.label}
            </span>
            <span className="font-medium">- {fmt(couponApplied.value)}</span>
          </div>
        )}

        <hr className="my-2 border-gray-200" />

        <div className="flex justify-between items-center font-semibold text-gray-800">
          <span>Total Amount</span>
          <span className="text-indigo-500">{fmt(totalBeforeTip)}</span>
        </div>

        <div className="flex items-center justify-between gap-3 mt-3">
          <div className="flex-1">
            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Have a coupon?"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                aria-label="Coupon code"
              />
              <button
                onClick={applyCoupon}
                className="px-3 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:brightness-95 transition"
              >
                Apply
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Try <strong>SAVE50</strong> or <strong>HALF10</strong>
            </p>
          </div>

          <button
            onClick={() => setShowBreakdown((s) => !s)}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium hover:shadow-sm transition"
            aria-expanded={showBreakdown}
          >
            {showBreakdown ? "Hide" : "Details"}
          </button>
        </div>

        {showBreakdown && (
          <div className="mt-3 p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-600 space-y-2">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{fmt(itemTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Surge</span>
              <span>{fmt(surgeCharge)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Fees</span>
              <span>{fmt(taxesAndFee)}</span>
            </div>
            {couponApplied && (
              <div className="flex justify-between text-green-700">
                <span>{couponApplied.code}</span>
                <span>-{fmt(couponApplied.value)}</span>
              </div>
            )}
            <hr className="border-gray-200" />
            <div className="flex justify-between font-semibold">
              <span>Payable</span>
              <span>{fmt(finalTotal)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCardButton;
