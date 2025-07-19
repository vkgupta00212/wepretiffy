import React, { useState } from "react";

const AddressFormCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Address:", formData);
    // 🔽 Call API or do something with the data
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Add New Address
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            name="address"
            rows={2}
            value={formData.address}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pincode
          </label>
          <input
            name="pincode"
            type="text"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-violet-700 text-white font-semibold rounded-md hover:bg-violet-800 transition"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressFormCard;
