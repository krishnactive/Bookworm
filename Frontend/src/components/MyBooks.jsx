import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/my-books`, {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        });
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, [authUser]);

  return (
    <div className="max-w-5xl mx-auto mt-20 px-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        My Books
      </h1>
      {books.length === 0 ? (
        <p className="text-lg text-gray-600 font-semibold">No books available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book._id} className="bg-white dark:bg-slate-800 shadow p-4 rounded-xl">
              <img src={book.image} alt={book.title} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{book.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{book.name}</p>
              <button className="mt-1 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 transition duration-300 ease"
>Start learning</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBooks;
