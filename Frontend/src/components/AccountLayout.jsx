import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AccountLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900 pt-20">
  <Sidebar/>
  {/* <div className="hidden sm:block w-72 shrink-0">
    <Sidebar />
  </div> */}

  {/* Main content */}
  <main className="flex-1 p-4 transition-all duration-300 overflow-x-hidden">
    <div className="max-w-6xl mx-auto w-full">
      <Outlet />
    </div>
  </main>
</div>

  );
};

export default AccountLayout;
