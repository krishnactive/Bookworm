import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Books from "./courses/Books";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Profile from "./components/Profile";
import Cart from "./components/Cart";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Navbar />
        {/* <div className="pt-1 min-h-screen"> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route
            path="/Book"
            element={authUser ? <Books /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element = {<Profile/>}/>
          <Route path="/cart" element = {<Cart/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster />

      </div>
    </>
  );
}

export default App;
