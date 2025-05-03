import React, { useEffect, useState } from "react";
import Cards from "./CardsBooks";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";

function Book() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/book`);
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-20">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center items-center gap-2 mb-4">
          <FaBookOpen className="text-[#347DFA] text-4xl" />
          <h1 className="text-3xl md:text-5xl font-bold text-[#347DFA]">
            Welcome to the SkillGain Library
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Explore our extensive collection of books, curated for curious minds and avid readers.
        </p>

        {/* Optional back button */}
        {/* <Link to="/">
          <button className="mt-6 bg-[#347DFA] text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
            Back to Home
          </button>
        </Link> */}
      </motion.div>

      <motion.div
        className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {book.map((item) => (
          <Cards key={item._id} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default Book;
