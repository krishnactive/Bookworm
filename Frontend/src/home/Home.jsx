import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";
import Freecourse from "../components/Freecourse";

function Home() {
  const [showFreeBooks, setShowFreeBooks] = React.useState(true);

  const handleToggle = () => {
    setShowFreeBooks(!showFreeBooks);
  };

  return (
    <>
      <Navbar />
      <Banner />

      {/* Toggle Section */}
      <div className="mt-12 flex justify-center items-center">
  <div
    onClick={handleToggle}
    className="relative w-64 h-14 bg-[#1E293B] rounded-full cursor-pointer shadow-lg flex items-center px-2 transition-all duration-300"
  >
    {/* Sliding Highlight/Knob */}
    <div
      className={`absolute h-12 w-28 bg-[#347DFA] rounded-full shadow-md transition-all duration-300 transform ${
        showFreeBooks ? "translate-x-1" : "translate-x-[115px]"
      }`}
    ></div>

    {/* Labels */}
    <div className="relative z-10 flex justify-between items-center w-full px-4 text-white font-semibold text-sm">
      <span
        className={`transition-colors duration-300 ${
          showFreeBooks ? "text-white" : "text-gray-400"
        }`}
      >
        Free Books
      </span>
      <span
        className={`transition-colors duration-300 ${
          showFreeBooks ? "text-gray-400" : "text-white"
        }`}
      >
        Free Courses
      </span>
    </div>
  </div>
</div>


      {/* Conditional Rendering */}
      {showFreeBooks ? <Freebook /> : <Freecourse />}
      <Footer />
    </>
  );
}

export default Home;
