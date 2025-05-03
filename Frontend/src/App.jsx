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
import About from "./components/AboutUs"
import Contact from "./components/Contact"
import AddressPage from "./components/Address";
import OrderHistory from "./components/OrderHistory"
import MyBooks from "./components/MyBooks";
import MyCourses from "./components/MyCourses";
import MyReviews from "./components/ReviewPage";
import NotificationPage from "./components/Notifications";
import GiftCard from "./components/GiftCards";
import Coupons from "./components/Coupons";
import Settings from "./components/Setting"
import { Outlet } from "react-router-dom";
function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Navbar />
        <Outlet/>
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
          <Route path="/about" element= {<About/>}/>
          <Route path="/contact" element= {<Contact/>}/>
          <Route path="/addresses" element={<AddressPage/>}/>
          <Route path="/order_history" element={<OrderHistory/>}></Route>
          <Route path="/my-courses" element={<MyCourses/>}></Route>
          <Route path="/my-books" element={<MyBooks/>}></Route>
          <Route path="/my-reviews" element={<MyReviews/>}></Route>
          <Route path="/notifications" element={<NotificationPage/>}></Route>
          <Route path="/gift-cards" element={<GiftCard/>}></Route>
          <Route path="/coupons" element={<Coupons/>}></Route>
          <Route path="/settings" element={<Settings/>}></Route>
        </Routes>
        <Toaster />

      </div>
    </>
  );
}

export default App;
