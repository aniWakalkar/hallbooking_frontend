import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AllBookings() {
  const { hallId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");
  const isAdmin = localStorage.getItem("user_role") === "admin";

  const statusOptions = ["Pending", "Confirmed", "Cancelled"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/bookings/hall/${hallId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const bookingsWithSelection = response.data.map(b => ({
          ...b,
          selectedStatus: b.status,
          saveDisabled: true,
        }));
        setBookings(bookingsWithSelection);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [hallId]);

  const handleStatusSelect = (bookingId, newStatus) => {
    setBookings(prev =>
      prev.map(b =>
        b._id === bookingId
          ? { ...b, selectedStatus: newStatus, saveDisabled: newStatus === b.status }
          : b
      )
    );
  };

  const handleStatusSave = async (bookingId) => {
    const booking = bookings.find(b => b._id === bookingId);
    if (!booking) return;

    setUpdating(bookingId);
    try {
      const token = localStorage.getItem("auth_token");

      const payload = {
        hallId: booking.hallId._id,
        userId: booking.userId._id,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        status: booking.selectedStatus
      };

      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/bookings/${bookingId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookings(prev =>
        prev.map(b =>
          b._id === bookingId
            ? {
                ...b,
                status: res.data.updatedBooking.status,
                selectedStatus: res.data.updatedBooking.status,
                saveDisabled: true,
              }
            : b
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update booking");
    } finally {
      setUpdating("");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading bookings...</p>;

  return (
    <div className="flex justify-center mt-10">
      <div className="p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Bookings for Hall</h2>
        {bookings.length === 0 ? (
          <p>No bookings for this hall yet.</p>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="border p-4 rounded-lg shadow-sm flex flex-col gap-2 bg-white">
                <p>
                  <strong>Hall:</strong> {booking.hallId?.name || "N/A"} ({booking.hallId?.location})
                </p>
                <p>
                  <strong>User:</strong> {booking.userId?.name || "N/A"} ({booking.userId?.email})
                </p>
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

                {isAdmin && (
                  <div className="flex gap-2 items-center mt-2">
                    <select
                      value={booking.selectedStatus}
                      onChange={(e) => handleStatusSelect(booking._id, e.target.value)}
                      disabled={updating === booking._id}
                      className="border px-2 py-1 rounded"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleStatusSave(booking._id)}
                      disabled={booking.saveDisabled || updating === booking._id}
                      className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {updating === booking._id ? "Saving..." : "Save"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllBookings;
