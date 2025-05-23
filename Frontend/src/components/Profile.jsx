import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { MdOutlineInventory2, MdOutlineCreditCard } from "react-icons/md";
import { FaUserAlt, FaGift, FaMobileAlt, FaHome, FaFileInvoice } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [authUser, setAuthUser] = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    fullname: authUser?.fullname || "",
    lastName: authUser?.lastName || "",
    gender: authUser?.gender || "",
    email: authUser?.email || "",
    phone: authUser?.phone || "",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    const token = authUser?.token;
    if (!token) {
      console.error("No token found.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }

      const result = await response.json();
      const updatedUser = { ...authUser, ...result };
      setAuthUser(updatedUser);
      localStorage.setItem("authUser", JSON.stringify(updatedUser));

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen pt-20 bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Mobile Settings Toggle */}
      <div className="sm:hidden fixed top-16 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl text-white bg-[#347DFA] dark:bg-blue-500 p-2 rounded-full shadow"
        >
          <FiSettings />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`sm:static absolute z-40 w-full sm:w-72 bg-gradient-to-b from-[#347DFA] to-blue-600 text-white dark:from-gray-800 dark:to-gray-900 p-5 shadow-xl rounded-r-xl transition-all duration-300
          ${sidebarOpen ? "top-20" : "-top-[1000px]"} sm:top-0`}
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
            <NavLink text="Orders" icon={<MdOutlineInventory2 />} link="/order_history" />
          </Section>
          <Section title="Account Settings">
            <NavLink text="Profile Information" icon={<FaUserAlt />} active />
            <NavLink text="Manage Addresses" icon={<FaHome />} link="/addresses" />
            <NavLink text="PAN Card Information" icon={<FaFileInvoice />} link="/pan-info" />
          </Section>
          <Section title="Payments">
            <NavLink
              text="Gift Cards"
              icon={<FaGift />}
              extra={<span className="text-emerald-300 font-bold">₹0</span>}
              link="/gift-cards"
            />
            <NavLink text="Saved UPI" icon={<FaMobileAlt />} link="/saved-upi" />
            <NavLink text="Saved Cards" icon={<MdOutlineCreditCard />} link="/saved-cards" />
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

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#347DFA] dark:text-blue-400">
              Personal Information
            </h2>
            <button
              onClick={isEditing ? handleSave : toggleEdit}
              className="text-[#347DFA] dark:text-blue-400 hover:underline text-sm"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Input name="fullname" value={form.fullname} onChange={handleChange} disabled={!isEditing} placeholder="First Name" />
            <Input name="lastName" value={form.lastName} onChange={handleChange} disabled={!isEditing} placeholder="Last Name" />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">Your Gender</label>
            <div className="flex space-x-4">
              {["Male", "Female", "Other"].map((gender) => (
                <label key={gender} className="flex items-center space-x-1 text-gray-800 dark:text-white">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={form.gender === gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
          </div>

          <InfoField label="Email Address" name="email" value={form.email} onChange={handleChange} disabled={!isEditing} />
          <InfoField label="Mobile Number" name="phone" value={form.phone} onChange={handleChange} disabled={!isEditing} />

          <div className="mt-10">
            <h3 className="text-lg font-semibold text-[#347DFA] dark:text-blue-400 mb-2">FAQs</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable components

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

function NavLink({ text, icon, active = false, extra, link = "#" }) {
  const baseStyle = "flex items-center justify-between px-2 py-2 rounded transition";
  const activeStyle = active
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

function Input({ name, value, onChange, disabled, placeholder }) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      className={`bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded border w-full
        ${disabled ? "border-gray-300 dark:border-gray-600" : "border-[#347DFA] dark:border-blue-400"}`}
    />
  );
}

function InfoField({ label, name, value, onChange, disabled }) {
  return (
    <div className="mb-6">
      <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={`bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded border w-full
          ${disabled ? "border-gray-300 dark:border-gray-600" : "border-[#347DFA] dark:border-blue-400"}`}
      />
    </div>
  );
}
