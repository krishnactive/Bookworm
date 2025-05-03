import React, { useEffect, useRef,useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import {
  FiShoppingCart, FiSearch, FiUser, FiBook, FiHeart,
  FiSettings, FiLogOut, FiBell, FiGift, FiStar, FiShoppingBag
} from "react-icons/fi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import Logout from "./Logout";
import { Moon, Sun } from "lucide-react";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [sticky, setSticky] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const element = document.documentElement;
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/course">Course</Link></li>
      <li><Link to="/Book">Books</Link></li>
      <li><Link to="/contact">Contacts</Link></li>
      <li><Link to="/about">About</Link></li>
    </>
  );

  return (
    <div className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${sticky ? "shadow-md" : ""} ${theme === "dark" ? "bg-slate-800 text-white" : "bg-white text-black"}`}>
      <div className="flex items-center justify-between py-3">
        
        {/* Left: Logo + Mobile Menu */}
        <div className="flex items-center gap-3">
          <div className="dropdown lg:hidden">
            <button
              tabIndex={0}
              className="p-2 rounded-lg backdrop-blur-md bg-white/30 dark:bg-slate-700/40 hover:bg-white/50 dark:hover:bg-slate-600/60 transition"
            >
              <HiOutlineMenuAlt3 className="text-2xl" />
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 dark:bg-slate-800 dark:text-white rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold">
            <span className="text-[#347DFA] dark:text-blue-400">Skill</span>
            <span className="text-gray-800 dark:text-white">Gain</span>
          </Link>
        </div>

        {/* Middle: Desktop Navigation */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:block">
            <label className="px-3 py-2 border rounded-md flex items-center gap-2">
              <input
                type="text"
                className="grow outline-none rounded-md px-1 dark:bg-slate-900 dark:text-white"
                placeholder="Search"
              />
              <FiSearch className="text-lg opacity-70" />
            </label>
          </div>
          <div className="block md:hidden">
            <FiSearch className="text-2xl hover:text-blue-500 cursor-pointer" />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-xl"
          >
            {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Cart and Profile */}
          {authUser ? (
            <div className="flex items-center gap-3">
              <Link to="/cart" className="relative">
                <FiShoppingCart className="text-2xl hover:text-blue-500 transition" />
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(prev => !prev)}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full ring ring-blue-400 hover:ring-blue-300 transition">
                    <img
                      src={authUser?.photoURL || "https://i.pravatar.cc/100"}
                      alt="avatar"
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 z-50 bg-white/80 dark:bg-slate-800/90 backdrop-blur-md shadow-xl border border-gray-200 dark:border-slate-700 rounded-xl p-3 space-y-2"
                    >
                      <DropdownLink to="/profile" icon={<FiUser />}>Profile</DropdownLink>
                      <DropdownLink to="/my-courses" icon={<FiBook />}>My Courses</DropdownLink>
                      <DropdownLink to="/my-books" icon={<FiBook />}>My Books</DropdownLink>
                      <DropdownLink to="/my-reviews" icon={<FiStar />}>My Reviews</DropdownLink>
                      <DropdownLink to="/my-wishlist" icon={<FiHeart />}>My Wishlist</DropdownLink>
                      <DropdownLink to="/order_history" icon={<FiShoppingBag />}>My Orders</DropdownLink>
                      <DropdownLink to="/notifications" icon={<FiBell />}>Notifications</DropdownLink>
                      <DropdownLink to="/coupons" icon={<FiGift />}>Coupons</DropdownLink>
                      <DropdownLink to="/gift-cards" icon={<FiGift />}>Gift Cards</DropdownLink>
                      <DropdownLink to="/settings" icon={<FiSettings />}>Settings</DropdownLink>
                      <div className="border-t border-gray-300 dark:border-gray-600 pt-2">
                        <li className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded-md cursor-pointer transition">
                          <FiLogOut /> <Logout />
                        </li>
                      </div>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div>
              <button
                className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </button>
              <Login />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Dropdown Link Item Component
function DropdownLink({ to, icon, children }) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-800 dark:text-white hover:bg-blue-100 dark:hover:bg-slate-600 rounded-md transition"
      >
        {icon} {children}
      </Link>
    </li>
  );
}

export default Navbar;
