import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";

function Course() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("http://localhost:4001/course");
        console.log("Fetched courses:", data);
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="text-center mt-40 text-lg">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center mt-40 text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="mt-20 text-center">
        <h1 className="text-2xl md:text-4xl font-semibold">
          Turn Knowledge into Power with Our{" "}
          <span className="text-pink-500">Courses</span>
        </h1>
        <p className="mt-6 text-gray-600">
          Discover expertly curated courses crafted to elevate your skills.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No courses found.</p>
        ) : (
          courses.map((course) => <Cards key={course._id || course.id} course={course} />)
        )}
      </div>
    </div>
  );
}

export default Course;
