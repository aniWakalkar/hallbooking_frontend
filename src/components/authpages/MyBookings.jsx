import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, Users, IndianRupee , CalendarPlus, Trash2 } from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [canceling, setCanceling] = useState(null); 

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setError("You must be logged in to view your bookings.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/bookings/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    setCanceling(bookingId);

    try {
      const token = localStorage.getItem("auth_token");
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove canceled booking from state
      setBookings(prev => prev.filter(b => b._id !== bookingId));
      alert("Booking canceled successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel booking.");
    } finally {
      setCanceling(null);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading your bookings...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-10">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <CalendarPlus className="w-6 h-6 mr-2 text-indigo-600" /> My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col"
            >
              <h2 className="text-xl font-bold mb-2">
                {booking.hallId?.name || "Hall Name"}
              </h2>
              <div className="flex items-center text-gray-600 mb-1">
                <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
                <span>{booking.hallId?.location || "Location"}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-1">
                <Users className="w-5 h-5 mr-2 text-indigo-500" />
                <span>Capacity: {booking.hallId?.capacity || "-"}</span>
              </div>
              <div className="flex items-center text-green-700 font-semibold mb-1">
                <IndianRupee  className="w-5 h-5 mr-2" />
                <span>{booking.hallId?.pricePerHour}/hour</span>
              </div>
              <div className="mt-2 text-gray-700">
                <p>
                  <strong>Date:</strong> {booking.date?.slice(0, 10)}
                </p>
                <p>
                  <strong>Time:</strong> {booking.startTime} - {booking.endTime}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      booking.status === "Pending"
                        ? "text-yellow-600"
                        : booking.status === "Confirmed"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </p>
              </div>

              {/* Cancel Booking Button */}
              {booking.status !== "Cancelled" && (
                <button
                  onClick={() => handleCancel(booking._id)}
                  disabled={canceling === booking._id}
                  className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-150 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {canceling === booking._id ? "Canceling..." : "Cancel Booking"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
