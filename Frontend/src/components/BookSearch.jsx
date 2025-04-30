import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      console.log(res.data);
      setBooks(res.data.items || []);
    } catch (error) {
      console.error("Error searching books", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Search Books</h1>

      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchBooks()}
        />
        <button
          onClick={searchBooks}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {books.map((book) => {
            const info = book.volumeInfo;
            return (
              <div key={book.id} className="border p-4 rounded-md shadow-md">
                <Link to={`/book/${book.id}`} className="block">
                  <img
                    src={info.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                    alt={info.title}
                    className="w-full h-48 object-cover mb-2 rounded-md"
                  />
                  <h2 className="text-lg font-semibold">{info.title}</h2>
                  <p className="text-sm text-gray-600">{info.authors?.join(", ")}</p>
                  <p className="text-sm mt-2">{info.description?.slice(0, 100)}...</p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BookSearch;
