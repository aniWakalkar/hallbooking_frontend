import { HashRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import PublicHallViewer from "./components/PublicHallViewer";
import Navbar from "./components/Navbar";
import SignUp from "./components/authpages/SignUp";
import LogIn from "./components/authpages/Login";
import MyBookings from "./components/authpages/MyBookings";
import AllBookings from "./components/adminpages/AllBookings";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <div className="min-h-screen">
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
    </HashRouter>
  );
}

export default App;
