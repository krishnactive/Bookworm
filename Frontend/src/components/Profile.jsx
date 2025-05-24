import { useAuth } from "../context/AuthProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

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

  return (
    <div className="flex min-h-screen pt-20 bg-gray-100 dark:bg-gray-900 transition-colors">
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