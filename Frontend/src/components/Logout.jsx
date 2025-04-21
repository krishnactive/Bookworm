import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("Users");
      toast.success("Logout successfully");

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error("Error: " + error);
      setTimeout(() => {}, 2000);
    }
  };
  return (
    // <div>
      <button
        // className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    // </div>
  );
}

export default Logout;
