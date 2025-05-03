import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import { motion } from "framer-motion";

function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/course`);
        console.log("Fetched courses: ", res.data);
        setCourses(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <div className="text-center mt-40">Loading courses...</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
      <div className="mt-20 text-center">
        <h1 className="text-2xl md:text-4xl font-semibold">
        Turn Knowledge into Power with Our  <span className="text-[#347DFA]">Courses</span>
        </h1>
        <p className="mt-6 text-gray-600">
          Discover expertly curated courses crafted to elevate your skills.
        </p>
        {/* <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
            Back
          </button>
        </Link> */}
      </div>
      </motion.div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No courses found.</p>
        ) : (
          courses.map((course) => <Cards key={course.id} course={course} />)
        )}
      </div>
    </div>
  );
}

export default Course;
