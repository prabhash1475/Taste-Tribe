import { useState } from "react";
import { LOGO_URL } from "../utils/common";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50  flex justify-between items-center px-6 py-4 bg-gradient-to-br from-green-200 to-yellow-200 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to="/">
          <img className="w-36" src={LOGO_URL} alt="HungerDash Logo" />
        </Link>
      </div>

      {/* Navigation Section for larger screens */}
      <nav className="hidden md:flex items-center space-x-6">
        <ul className="flex space-x-4 text-black-700 text-lg">
          <li className="flex items-center space-x-2">
            <span>{onlineStatus ? "Offline: 🔴" : "Online: 🟢"}</span>
          </li>
          <li className="hover:text-gray-400 hover:underline transition duration-300">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-gray-400 hover:underline transition duration-300">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="hover:text-gray-400 hover:underline transition duration-300">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-gray-400 hover:underline transition duration-300">
            <Link to="/grocery">Grocery</Link>
          </li>
        </ul>

        {/* Login/Logout Button */}
        <button
          className="bg-green-400 hover:bg-green-300 text-gray-800 font-semibold px-4 py-2 rounded transition duration-300 w-24 md:ml-4"
          onClick={() => setBtnName(btnName === "Login" ? "Logout" : "Login")}
        >
          {btnName}
        </button>
      </nav>

      {/* Hamburger Icon for Mobile View */}
      <div className="md:hidden">
        <button
          className="text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {/* Icon for hamburger */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 right-0 w-55 h-auto bg-orange-600 shadow-lg z-50 transition-transform transform translate-x-0">
          <div className="flex justify-end p-4">
            <button onClick={toggleMobileMenu} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col items-center p-4 text-white text-lg space-y-4">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-400 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-400 transition duration-300"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-yellow-400 transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/grocery"
                className="hover:text-yellow-400 transition duration-300"
              >
                Grocery
              </Link>
            </li>
            <li>
              <Link
                to="/rest:resId"
                className="hover:text-yellow-400 transition duration-300"
              >
                <img
                  className="w-6"
                  src="https://www.i2clipart.com/cliparts/f/b/e/5/clipart-heart-fbe5.png"
                  alt="Favorites"
                />
              </Link>
            </li>
            <li>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold px-4 py-2 rounded transition duration-300 w-full mt-2"
                onClick={() =>
                  setBtnName(btnName === "Login" ? "Logout" : "Login")
                }
              >
                {btnName}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
