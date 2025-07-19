import React, { useState } from "react";

const days = [
  { label: "Fri", date: "18", recommended: true },
  { label: "Sat", date: "19", recommended: false },
  { label: "Sun", date: "20", recommended: false },
];

const timeSlots = [
  { time: "06:30 PM", price: 200 },
  { time: "07:00 PM", price: 200 },
  { time: "07:30 PM", price: 200 },
];

const SlotCard = () => {
  const [selectedDay, setSelectedDay] = useState("18");
  const [selectedTime, setSelectedTime] = useState("06:30 PM");

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        When should the professional arrive?
      </h2>

      {/* Schedule for later */}
      <div className="border rounded-lg p-4 mb-4">
        <h3 className="font-medium mb-2">Schedule for later</h3>
        <p className="text-sm text-gray-500 mb-3">
          Select your preferred day & time
        </p>

        {/* Day Selector */}
        <div className="flex space-x-3 mb-4">
          {days.map((day) => (
            <button
              key={day.date}
              onClick={() => setSelectedDay(day.date)}
              className={`flex flex-col items-center px-4 py-2 rounded-lg border transition ${
                selectedDay === day.date
                  ? "border-purple-600 bg-purple-100 text-purple-600"
                  : "border-gray-200 text-gray-800"
              }`}
            >
              <span className="text-sm font-semibold">{day.label}</span>
              <span className="text-lg font-bold">{day.date}</span>
              {day.recommended && (
                <span className="text-xs text-yellow-500">★</span>
              )}
            </button>
          ))}
        </div>

        {/* Time Slot Selector */}
        <div>
          <h4 className="font-semibold mb-2">Select start time of service</h4>
          <div className="flex space-x-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => setSelectedTime(slot.time)}
                className={`px-4 py-2 rounded-lg border flex flex-col items-center transition ${
                  selectedTime === slot.time
                    ? "border-purple-600 bg-purple-100 text-purple-600"
                    : "border-gray-300"
                }`}
              >
                <span>{slot.time}</span>
                <span className="text-sm text-amber-500">+ ₹{slot.price}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Proceed Button */}
      <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold">
        Proceed to checkout
      </button>
    </div>
  );
};

export default SlotCard;
