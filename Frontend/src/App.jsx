import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

// Pages and components
import Navbar from "./components/Navbar";
import Home from "./home/Home";
import Courses from "./courses/Courses";
import Books from "./courses/Books";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import About from "./components/AboutUs";
import Contact from "./components/Contact";
import AddressPage from "./components/Address";
import OrderHistory from "./components/OrderHistory";
import MyBooks from "./components/MyBooks";
import MyCourses from "./components/MyCourses";
import MyReviews from "./components/ReviewPage";
import NotificationPage from "./components/Notifications";
import GiftCard from "./components/GiftCards";
import Coupons from "./components/Coupons";
import Settings from "./components/Setting";
import SavedUpi from "./components/SavedUpi";
import SavedCards from "./components/SavedCards";
import PanInfo from "./components/PanInfo";
import AccountLayout from "./components/AccountLayout";

function App() {
  const [authUser] = useAuth();

  return (
    <div className="dark:bg-slate-900 dark:text-white">
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/my-books" element={<MyBooks />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/settings" element={<Settings />} />

        {/* Protected Routes */}
        <Route
          path="/course"
          element={authUser ? <Courses /> : <Navigate to="/signup" />}
        />
        <Route
          path="/book"
          element={authUser ? <Books /> : <Navigate to="/signup" />}
        />

        {/* Account Layout Routes */}
        <Route path="/" element={<AccountLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="addresses" element={<AddressPage />} />
          <Route path="order_history" element={<OrderHistory />} />
          <Route path="gift-cards" element={<GiftCard />} />
          <Route path="saved-upi" element={<SavedUpi />} />
          <Route path="saved-cards" element={<SavedCards />} />
          <Route path="pan-info" element={<PanInfo />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
