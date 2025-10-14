import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import PublicHallViewer from "./components/PublicHallViewer";
import Navbar from "./components/Navbar";
import SignUp from "./components/authpages/SignUp";
import LogIn from "./components/authpages/Login";
import MyBookings from "./components/authpages/MyBookings";
import AllBookings from "./components/adminpages/AllBookings";

function App() {
  
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/hallbooking_frontend/" element={<PublicHallViewer />} />
          <Route path="/hallbooking_frontend/Halls" element={<PublicHallViewer />} />
          <Route path="/hallbooking_frontend/signup" element={<SignUp />} />
          <Route path="/hallbooking_frontend/login" element={<LogIn />} />
          <Route path="/hallbooking_frontend/mybooking" element={<MyBookings />} /> 
          <Route path="/hallbooking_frontend/admin/hall/:hallId/bookings" element={<AllBookings />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;