import { useState } from 'react';

const Main = () => {
    // State management for booking form inputs
    const [selectedHall, setSelectedHall] = useState('Grand Ballroom');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [purpose, setPurpose] = useState('');
    const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);

    // Mock data for halls
    const halls = [
        { name: "Grand Ballroom", capacity: 300, price: 1500, description: "Luxurious space perfect for large events." },
        { name: "Conference Suite A", capacity: 50, price: 500, description: "Ideal for mid-sized meetings and workshops." },
        { name: "Board Room 1", capacity: 15, price: 200, description: "Intimate setting for executive meetings." },
        { name: "Sky View Terrace", capacity: 100, price: 800, description: "Outdoor/indoor space with panoramic city views." },
    ];

    const currentHall = halls.find(h => h.name === selectedHall);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simple mock validation/booking logic
        if (selectedHall && date && startTime && endTime && purpose) {
            console.log("Booking Details:", { selectedHall, date, startTime, endTime, purpose });
            setIsBookingSuccessful(true);
            
            // Reset form fields after successful booking
            setDate('');
            setStartTime('');
            setEndTime('');
            setPurpose('');

            // Reset success message after 5 seconds
            setTimeout(() => setIsBookingSuccessful(false), 5000); 
        } else {
            // Note: In a real app, use a custom modal/toast, not alert().
            console.error("Please fill out all required fields.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="text-center mb-12 mt-8">
                <h1 className="text-4xl font-extrabold text-gray-900">Book Your Event Space</h1>
                <p className="mt-2 text-xl text-indigo-600 font-medium">Secure the perfect venue for your next gathering.</p>
            </div>

            {/* Booking Card */}
            <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-2xl border border-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Hall Details/Selection (Column 1) */}
                    <div className="lg:col-span-1 bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-start">
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">Venue Selection</h2>
                        
                        <label htmlFor="hall-select" className="block text-base font-semibold text-gray-700 mb-2">
                            Choose a Hall
                        </label>
                        <select
                            id="hall-select"
                            value={selectedHall}
                            onChange={(e) => setSelectedHall(e.target.value)}
                            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 text-lg transition duration-150 shadow-sm"
                        >
                            {halls.map(hall => (
                                <option key={hall.name} value={hall.name}>{hall.name}</option>
                            ))}
                        </select>

                        {currentHall && (
                            <div className="mt-8 p-5 bg-indigo-50 border-l-4 border-indigo-600 rounded-lg shadow-md">
                                <p className="text-xl font-extrabold text-indigo-800">{currentHall.name}</p>
                                <p className="text-sm text-indigo-600 mt-2">{currentHall.description}</p>
                                <div className="mt-4 pt-3 border-t border-indigo-200 flex justify-between">
                                    <p className="text-base text-indigo-700">Capacity: <span className="font-bold">{currentHall.capacity}</span> guests</p>
                                    <p className="text-base text-indigo-700">Rate: <span className="font-bold text-lg">${currentHall.price}</span> / hr</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Booking Form (Column 2 & 3) */}
                    <form onSubmit={handleSubmit} className="lg:col-span-2">
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">Reservation Details</h2>
                        
                        {/* Date and Time Group */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            
                            {/* Date */}
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                                />
                            </div>
                            {/* Start Time */}
                            <div>
                                <label htmlFor="start-time" className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                                <input
                                    type="time"
                                    id="start-time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                                />
                            </div>
                            {/* End Time */}
                            <div>
                                <label htmlFor="end-time" className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                                <input
                                    type="time"
                                    id="end-time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    required
                                    className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Purpose */}
                        <div className="mb-10">
                            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                                Event Purpose / Description
                            </label>
                            <textarea
                                id="purpose"
                                rows="4"
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                required
                                placeholder="e.g., Annual Sales Conference, Wedding Reception, Team Training"
                                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none shadow-sm"
                            ></textarea>
                        </div>
                        
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white p-4 rounded-xl font-extrabold text-xl shadow-lg shadow-indigo-500/50 hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.005]"
                        >
                            Confirm Booking
                        </button>
                        
                        {/* Success Message */}
                        {isBookingSuccessful && (
                            <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-xl text-center font-bold border border-green-200 transition duration-300">
                                Success! Your reservation for the **{selectedHall}** has been confirmed.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Main