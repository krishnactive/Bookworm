import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Clear user from context and localStorage
      setAuthUser(null);

      // setAuthUser({ ...authUser, user: null });
      // localStorage.removeItem("Users");

      // Notify and redirect
      toast.success("Logout successful");

      // Redirect after short delay (optional)
      setTimeout(() => {
        navigate("/login"); // or "/" if you prefer homepage
      }, 1000);

    } catch (error) {
      toast.error("Error: " + (error.message || "Logout failed"));
    }
  };

  return (
    <button
      className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-600"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default Logout;
