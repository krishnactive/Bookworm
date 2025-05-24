// Sidebar.jsx
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { FiSettings } from "react-icons/fi";
import {
  MdOutlineInventory2,
  MdOutlineCreditCard,
} from "react-icons/md";
import {
  FaUserAlt,
  FaGift,
  FaMobileAlt,
  FaHome,
  FaFileInvoice,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [authUser] = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackToHome = () => {
    navigate("/");
  };

  useEffect(() => {
  setSidebarOpen(false); 
}, [location.pathname]);

  return (
    <>
      <div className="sm:hidden fixed top-16 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl text-white bg-[#347DFA] dark:bg-blue-500 p-2 rounded-full shadow"
        >
          <FiSettings />
        </button>
      </div>

     <aside
  className={`fixed sm:static top-20 sm:top-0 left-0 z-40 h-[calc(100vh-5rem)] sm:h-screen w-72 bg-gradient-to-b from-[#347DFA] to-blue-600 text-white dark:from-gray-800 dark:to-gray-900 p-5 shadow-xl transition-transform duration-300 transform ${
    sidebarOpen ? "translate-y-0" : "-translate-y-full sm:translate-y-0"
  }`}
>


        <div className="flex items-center space-x-3 mb-8">
          <img
            src={authUser?.profile || "https://i.pravatar.cc/100"}
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-white shadow"
          />
          <div>
            <p className="text-sm opacity-80">Welcome,</p>
            <h2 className="text-lg font-bold">{authUser?.fullname || "User"}</h2>
          </div>
        </div>

        <nav className="space-y-4 text-sm font-medium">
          <Section title="My Orders">
            <NavLink text="Orders" icon={<MdOutlineInventory2 />} link="/order_history" location={location} />
          </Section>
          <Section title="Account Settings">
            <NavLink text="Profile Information" icon={<FaUserAlt />} link="/profile" location={location} />
            <NavLink text="Manage Addresses" icon={<FaHome />} link="/addresses" location={location} />
            <NavLink text="PAN Card Information" icon={<FaFileInvoice />} link="/pan-info" location={location} />
          </Section>
          <Section title="Payments">
            <NavLink text="Gift Cards" icon={<FaGift />} extra={<span className="text-emerald-300 font-bold">₹0</span>} link="/gift-cards" location={location} />
            <NavLink text="Saved UPI" icon={<FaMobileAlt />} link="/saved-upi" location={location} />
            <NavLink text="Saved Cards" icon={<MdOutlineCreditCard />} link="/saved-cards" location={location} />
          </Section>
        </nav>

        <div className="mt-10 border-t border-white/20 pt-4">
          <button
            onClick={handleBackToHome}
            className="w-full text-left text-sm text-white opacity-70 hover:opacity-100 transition"
          >
            🏠 Back to Home
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-white/60 mb-2 mt-6">
        {title}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function NavLink({ text, icon, extra, link, location }) {
  const isActive = location.pathname === link;

  const baseStyle = "flex items-center justify-between px-2 py-2 rounded transition";
  const activeStyle = isActive
    ? "bg-white/20 text-white font-semibold"
    : "hover:bg-white/10 text-white";

  return (
    <Link to={link} className={`${baseStyle} ${activeStyle}`}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        <span>{text}</span>
      </div>
      {extra}
    </Link>
  );
}