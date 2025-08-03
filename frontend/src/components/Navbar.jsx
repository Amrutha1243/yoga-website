import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInitial, setUserInitial] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // ✅ Decode token to get user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const name = decoded.name || "";
        setUserName(name);
        setUserInitial(name.charAt(0).toUpperCase());
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-[#fdfdfd] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="PranaVeda" className="h-10 w-10" />
          <span className="text-2xl font-bold text-[#1e4d2b]">PranaVeda</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 font-medium items-center">
          <Link to="/" className="text-gray-700 hover:text-[#1e4d2b]">Home</Link>
          <Link to="/classes" className="text-gray-700 hover:text-[#1e4d2b]">Classes</Link>
          <Link to="/instructors" className="text-gray-700 hover:text-[#1e4d2b]">Instructors</Link>

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-green-700 text-white font-bold"
              >
                {userInitial}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                  <p className="px-4 py-2 text-gray-600 text-sm border-b">
                    👋 Hi, {userName.split(" ")[0]}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="bg-[#1e4d2b] text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow space-y-2">
          <Link to="/" className="block text-gray-700">Home</Link>
          <Link to="/classes" className="block text-gray-700">Classes</Link>
          <Link to="/instructors" className="block text-gray-700">Instructors</Link>
          {isLoggedIn ? (
            <>
              <p className="text-gray-600 text-sm">👋 Welcome, {userName.split(" ")[0]}</p>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="block text-white bg-[#1e4d2b] text-center rounded py-1"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
