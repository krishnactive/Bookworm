import React from "react";

function Toggle({ showFreeBooks, handleToggle }) {
  return (
    <div className="mt-12 flex justify-center items-center">
      <div
        onClick={handleToggle}
        className="relative w-64 h-14 bg-[#1E293B] rounded-full cursor-pointer shadow-lg flex items-center px-2 transition-all duration-300"
      >
        <div
          className={`absolute h-12 w-28 bg-[#347DFA] rounded-full shadow-md transition-all duration-300 transform ${
            showFreeBooks ? "translate-x-1" : "translate-x-[115px]"
          }`}
        ></div>
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
  );
}

export default Toggle;
