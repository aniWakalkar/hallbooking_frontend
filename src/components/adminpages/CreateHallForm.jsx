import React, { useState, useEffect } from "react";
import { Building2 } from "lucide-react";
import axios from "axios";

const CreateHallForm = ({ onSuccess, formStatus }) => {
  const [formData, setFormData] = useState({ name: "", location: "", capacity: "", pricePerHour: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 1000);
      return () => clearTimeout(timer); 
    }
  }, [message.text]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, location, capacity, pricePerHour } = formData;
    if (!name || !location || !capacity || !pricePerHour) {
      setMessage({ type: "error", text: "Please fill all fields." });
      return;
    }

    try {
      setIsSubmitting(true);
      const token = JSON.parse(localStorage.getItem("auth") || "{}")?.token || "";
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/halls`,
        { name, location, capacity, pricePerHour },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ type: "success", text: response.data.message || "Hall created successfully!" });
      setFormData({ name: "", location: "", capacity: "", pricePerHour: "" });
      onSuccess();
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Unexpected error." });
    } finally {
      setIsSubmitting(false);
      formStatus(false)
    }
  };

  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-white p-6 rounded-xl shadow-xl border border-gray-100 w-[500px]">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Building2 className="w-6 h-6 mr-2 text-indigo-600" /> Create New Hall
      </h2>
      {message.text && (
        <div
          className={`p-3 mb-4 border rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-100 border-green-400 text-green-700"
              : "bg-red-100 border-red-400 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Hall Name"
          className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
        />
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="Capacity"
          className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
        />
        <input
          type="number"
          name="pricePerHour"
          value={formData.pricePerHour}
          onChange={handleChange}
          placeholder="Price per Hour ($)"
          className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 w-full text-sm"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`col-span-2 w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 text-sm ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Creating..." : "Create Hall"}
        </button>
      </form>
    </div>
  );
};

export default CreateHallForm;
