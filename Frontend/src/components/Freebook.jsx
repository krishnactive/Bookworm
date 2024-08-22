import React, { useEffect, useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";

import Cards from "./Cards";
function Freebook() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:5173/book");

        const data = res.data.filter((data) => data.category === "Free");
        console.log(data);
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
       <div className="max-w-screen-lg mx-auto py-12 px-4 md:px-8">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Free Offered Courses
      </h2>

      <p className="text-lg md:text-xl mb-6 text-center">
        At BOOKWORM, we believe that education should be accessible to everyone,
        which is why we offer a variety of free courses to help you expand your
        knowledge and skills without any cost. Whether you’re looking to learn
        something new or enhance your existing skills, our free courses are
        designed to provide valuable learning opportunities for learners of all
        levels.
      </p>

      <div className="space-y-4">
        <h3 className="text-xl md:text-2xl font-semibold">Why Choose Our Free Courses?</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Expert-Led Content:</strong> Learn from experienced
            professionals and industry experts who are passionate about sharing
            their knowledge.
          </li>
          <li>
            <strong>Flexible Learning:</strong> Access our courses anytime,
            anywhere, at your own pace. Our courses are designed to fit into
            your busy schedule.
          </li>
          <li>
            <strong>Wide Range of Topics:</strong> From programming and digital
            marketing to creative writing and personal development, our free
            courses cover a wide range of subjects.
          </li>
          <li>
            <strong>Certification:</strong> Upon completion of the course,
            receive a certificate that you can share on your resume or LinkedIn
            profile to showcase your new skills.
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">Featured Free Courses</h3>
        <ul className="space-y-4">
          <li>
            <h4 className="text-lg md:text-xl font-medium">
              Introduction to Web Development
            </h4>
            <p>
              Start your journey into the world of web development with this
              beginner-friendly course. Learn the basics of HTML, CSS, and
              JavaScript to create your first website.
            </p>
          </li>
          <li>
            <h4 className="text-lg md:text-xl font-medium">
              Digital Marketing Essentials
            </h4>
            <p>
              Discover the key concepts of digital marketing, including SEO,
              social media marketing, and content strategy. Perfect for anyone
              looking to start a career in marketing.
            </p>
          </li>
          <li>
            <h4 className="text-lg md:text-xl font-medium">Creative Writing 101</h4>
            <p>
              Unleash your creativity with our introductory course on creative
              writing. Explore different writing styles and techniques to tell
              your stories effectively.
            </p>
          </li>
          <li>
            <h4 className="text-lg md:text-xl font-medium">
              Personal Finance Management
            </h4>
            <p>
              Learn how to manage your finances, create a budget, and make
              informed financial decisions. This course is ideal for anyone
              looking to take control of their financial future.
            </p>
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">How to Enroll</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Browse our catalog of free courses.</li>
          <li>Sign Up with your email or social media account.</li>
          <li>Enroll in the course that interests you.</li>
          <li>
            Start Learning right away! All course materials are available
            immediately after enrollment.
          </li>
        </ol>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg md:text-xl mb-4">
          Don’t wait to invest in your future. Explore our free courses and
          start learning something new today. Whether you’re looking to advance
          your career, pursue a passion, or simply learn something new,
          BOOKWORM’s free courses offer the perfect starting point.
        </p>
        <button className="btn btn-primary">Explore Courses</button>
      </div>
    </div>
    </>
  );
}
export default Freebook;
