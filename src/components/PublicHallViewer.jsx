import React, { useState, useEffect, useCallback } from "react";
import { PlusCircle, RefreshCw, MapPin, Users, IndianRupee , X } from "lucide-react";
import axios from "axios";
import CreateHallForm from "./adminpages/CreateHallForm";
import { useNavigate } from "react-router-dom";

function PublicHallViewer() {
  const [halls, setHalls] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentHall, setCurrentHall] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  const navigate = useNavigate();

  // --- Fetch Halls ---
  const fetchHalls = useCallback(async () => {
    setIsFetching(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/halls`);
      setHalls(res.data);
    } catch (err) {
      console.error(err);
      setHalls([]);
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchHalls();
    const role = localStorage.getItem("user_role");
    setIsAdmin(role === "admin");
  }, [fetchHalls]);

  // --- Handle Hall Click ---
  const handleHallClick = (hall) => {
    const role = localStorage.getItem("user_role");
    if (role === "admin") {
      navigate(`/admin/hall/${hall._id}/bookings`);
    } else {
      setCurrentHall(hall);
      setBookingData({ date: "", startTime: "", endTime: "" });
      setShowBookingModal(true);
    }
  };

  // --- Booking Modal Handlers ---
  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("Please login to book a hall.");
      return;
    }

    try {
      const token = localStorage.getItem("auth_token");
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/bookings`,
        {
          hallId: currentHall._id,
          userId,
          date: bookingData.date,
          startTime: bookingData.startTime,
          endTime: bookingData.endTime,
          status: "Pending",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Booking created successfully!");
      setShowBookingModal(false);
      setCurrentHall(null);
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10">
      {/* Header */}
      <header className="mb-8 border-b pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            Event Halls
          </h1>
        </div>

        {/* Admin Create Hall Button */}
        {isAdmin && (
          <button
            onClick={() => setShowCreateForm(prev => !prev)}
            className={`flex items-center px-4 py-2 rounded-lg transition duration-150 ${
              showCreateForm
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {showCreateForm ? (
              <span className="w-5 h-5 mr-2 flex items-center justify-center">✕</span>
            ) : (
              <PlusCircle className="w-5 h-5 mr-2" />
            )}
            {showCreateForm ? "Close Form" : "Create Hall"}
          </button>
        )}
      </header>

      {/* Admin Create Hall Form */}
      {isAdmin && showCreateForm && <CreateHallForm onSuccess={fetchHalls} />}

      {/* Refresh Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={fetchHalls}
          disabled={isFetching}
          className="flex items-center px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg shadow-sm hover:bg-indigo-100 transition duration-150 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
          {isFetching ? "Refreshing..." : "Refresh List"}
        </button>
      </div>

      {/* Halls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {halls.map(hall => (
          <div
            key={hall._id}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-xl hover:scale-[1.01] flex flex-col"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{hall.name}</h3>
            <div className="space-y-3 mt-4 flex-grow">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-indigo-500 flex-shrink-0" />
                <span>{hall.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-3 text-indigo-500 flex-shrink-0" />
                <span>
                  Capacity: <strong className="text-gray-800">{hall.capacity}</strong>
                </span>
              </div>
              <div className="flex items-center text-green-700 font-semibold text-lg">
                <IndianRupee  className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>{hall.pricePerHour}/ hour</span>
              </div>
            </div>

            <button
              onClick={() => handleHallClick(hall)}
              className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150"
            >
              {isAdmin ? "View Bookings" : "Book Now"}
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBookingModal && currentHall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Book: {currentHall.name}</h2>

            <form onSubmit={handleBookingSubmit} className="space-y-3">
              <input
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleBookingChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-3"
                required
              />
              <input
                type="time"
                name="startTime"
                value={bookingData.startTime}
                onChange={handleBookingChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-3"
                required
              />
              <input
                type="time"
                name="endTime"
                value={bookingData.endTime}
                onChange={handleBookingChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-3"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-150"
              >
                {isSubmitting ? "Confirming Booking..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PublicHallViewer;
