import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import PublicHallViewer from "./components/PublicHallViewer"; // This will represent the Home component
import Navbar from "./components/Navbar";
import SignUp from "./components/authpages/SignUp";
import LogIn from "./components/authpages/Login";
import MyBookings from "./components/MyBookings";
import AllBookings from "./components/adminpages/AllBookings";

function App() {
  // activePage state is no longer needed; routing handles the active page.
  
  return (
    // 1. Wrap the entire application in BrowserRouter
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen">
        {/* 2. Define the Routes */}
        <Routes>
          <Route path="/" element={<PublicHallViewer />} />
          <Route path="/Halls" element={<PublicHallViewer />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/mybooking" element={<MyBookings />} /> 
          <Route path="/admin/hall/:hallId/bookings" element={<AllBookings />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;