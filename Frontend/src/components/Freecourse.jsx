import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [freeBooks, setFreeBooks] = useState([]);

  useEffect(() => {
    const fetchFreeBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4001/course");
        const filtered = res.data.filter((course) => course.price === 0);
        setFreeBooks(filtered);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFreeBooks();
  }, []);

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-28">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-semibold">
          Browse Our <span className="text-green-500">Free Courses</span>
        </h1>
        <p className="mt-6 text-gray-600">
          Enjoy a curated list of amazing reads without spending a dime.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        {freeBooks.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/Book">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 duration-300">
            Explore All Courses
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
