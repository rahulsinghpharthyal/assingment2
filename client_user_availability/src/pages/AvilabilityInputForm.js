import React, { useState } from "react";
import axiosPrivate from "../customaxios/axiosPrivate";
import { useSelector } from "react-redux";

const AvailabilityInputForm = () => {
  const userData = useSelector((state) => state.login.user);
  const [formData, setFormData] = useState({
    start: "",
    end: "",
    _id: userData._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.post("/api/auth/create-avilability", formData, {
        headers: { Authorization: `Bearer ${userData.token}` },
        withCredentials: true,
      });
      alert("Availability submitted!");
    } catch (error) {
      console.error("Error submitting availability:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-lg rounded-xl mt-12">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Add Your Availability
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label
            htmlFor="start"
            className="text-lg font-medium text-gray-700 mb-2"
          >
            Start Time
          </label>
          <input
            id="start"
            name="start"
            type="datetime-local"
            value={formData.start}
            onChange={handleChange}
            required
            className="p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="end"
            className="text-lg font-medium text-gray-700 mb-2"
          >
            End Time
          </label>
          <input
            id="end"
            name="end"
            type="datetime-local"
            value={formData.end}
            onChange={handleChange}
            required
            className="p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
        >
          Submit Availability
        </button>
      </form>
    </div>
  );
};

export default AvailabilityInputForm;
