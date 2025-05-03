import React, { useState } from "react";
import { FaUserCog, FaBell, FaLock } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Setting = () => {
  const [selectedTab, setSelectedTab] = useState("profile");
  const [authUser] = useAuth();

  // Security tab states
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill out both fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/user/change-password`, {
        userId: authUser._id,
        newPassword,
      });

      if (res.status === 200) {
        toast.success("Password updated successfully");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      toast.error("Failed to update password");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (selectedTab) {
      case "profile":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Edit Profile</h3>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-xl transition duration-300">
              Save Changes
            </button>
          </div>
        );
      case "notifications":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Notification Preferences</h3>
            {[
              { label: "Offers & Promotions", defaultChecked: true },
              { label: "Book Arrivals", defaultChecked: true },
              { label: "Course Updates", defaultChecked: false },
            ].map((item, idx) => (
              <div className="flex items-center justify-between" key={idx}>
                <label className="text-gray-700 dark:text-gray-300">{item.label}</label>
                <input
                  type="checkbox"
                  className="accent-rose-500 w-5 h-5"
                  defaultChecked={item.defaultChecked}
                />
              </div>
            ))}
          </div>
        );
      case "security":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Change Password</h3>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              onClick={handlePasswordChange}
              disabled={loading}
              className="bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-xl transition duration-300"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-20 px-4">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">⚙️ Account Settings</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 space-y-3">
            {[
              { key: "profile", icon: <FaUserCog />, label: "Profile" },
              { key: "notifications", icon: <FaBell />, label: "Notifications" },
              { key: "security", icon: <FaLock />, label: "Security" },
            ].map(({ key, icon, label }) => (
              <button
                key={key}
                onClick={() => setSelectedTab(key)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-medium transition ${
                  selectedTab === key
                    ? "bg-rose-100 text-rose-600 dark:bg-rose-900"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>
          <div className="md:w-3/4">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
