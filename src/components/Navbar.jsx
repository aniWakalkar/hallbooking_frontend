import { LogIn as LogInIcon, UserPlus, LogOut, CalendarPlus, Building2  } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const NavItem = ({ name, icon, to, isActive }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition duration-200 
      ${
        isActive
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
          : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-50"
      }`}
    aria-current={isActive ? "page" : undefined}
  >
    {icon}
    <span className="hidden sm:inline">{name}</span>
  </Link>
);

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const role = localStorage.getItem("user_role");

    setIsLoggedIn(!!token);
    setIsAdmin(role === "admin");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_id");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  const publicNavItems = [
    { name: "Sign Up", path: "/signup", icon: <UserPlus size={20} /> },
    { name: "Log In", path: "/login", icon: <LogInIcon size={20} /> },
  ];

  const userNavItems = [
    { name: "Halls", path: "/Halls", icon: <Building2 size={20} /> },
    { name: "My Bookings", path: "/mybooking", icon: <CalendarPlus size={20} /> },
  ];
  const adminNavItems = [
    { name: "Halls", path: "/Halls", icon: <Building2 size={20} /> },
  ];

  return (
    <header className="bg-white shadow-xl sticky top-0 z-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-3xl font-extrabold text-indigo-700 hover:text-indigo-900 transition duration-150"
            >
              Hall<span className="text-gray-900">Booking</span>
            </Link>
          </div>

          <nav className="flex items-center space-x-2 sm:space-x-4 p-2 rounded-full bg-gray-100 shadow-inner">

            {/* Logged-in User (admin): show My Bookings */}
            {isLoggedIn && isAdmin &&
              adminNavItems.map((item) => (
                <NavItem
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  to={item.path}
                  isActive={currentPath === item.path || (item.name === "Halls" && currentPath === "/")}
                />
              ))
            }


            {/* Logged-in User (non-admin): show My Bookings */}
            {isLoggedIn && !isAdmin &&
              userNavItems.map((item) => (
                <NavItem
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  to={item.path}
                  isActive={currentPath === item.path || (item.name === "Halls" && currentPath === "/")}
                />
              ))
            }

            {/* Logout button: always visible if logged in */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition duration-200"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}

            {/* Non-logged-in: show public items */}
            {!isLoggedIn &&
              publicNavItems.map((item) => (
                <NavItem
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  to={item.path}
                  isActive={currentPath === item.path}
                />
              ))
            }

          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
