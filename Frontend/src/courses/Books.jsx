import React from "react";
import Navbar from "../components/Navbar";
import Book from "../components/Book";
import Footer from "../components/Footer";
function Books  () {
  return (
    <>
      <Navbar />
      <div className=" min-h-screen">
        <Book />
      </div>
      <Footer />
    </>
  );
}

export default Books;
