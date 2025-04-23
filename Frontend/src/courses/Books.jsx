import React from "react";
import Navbar from "../components/Navbar";
import Book from "../components/Book";
import Footer from "../components/Footer";
import AuthProvider from "../context/AuthProvider";

function Books  () {
  return (
    <>
    <AuthProvider>
    {/* <Navbar /> */}
    <div className="pt-1 min-h-screen">
        <Book />
      </div>
      <Footer />
    </AuthProvider>
      
    </>
  );
}

export default Books;
