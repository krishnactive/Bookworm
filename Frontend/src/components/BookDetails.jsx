import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookDetails() {
  const { id } = useParams();
  console.log("Book ID from URL:", id);  // Add this line to see the ID

  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching book details", error);
      }
    };
    fetchBookDetails();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  const { volumeInfo } = book;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{volumeInfo.title}</h1>
      <div className="flex gap-8">
        <img
          src={volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
          alt={volumeInfo.title}
          className="w-64 h-96 object-cover"
        />
        <div>
          <p className="text-xl font-semibold mb-2">Authors: {volumeInfo.authors?.join(", ")}</p>
          <p className="text-lg mb-2">Publisher: {volumeInfo.publisher}</p>
          <p className="text-lg mb-4">Published Date: {volumeInfo.publishedDate}</p>
          <p className="text-lg">{volumeInfo.description}</p>
          <a
            href={volumeInfo.infoLink}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-blue-500"
          >
            View on Google Books
          </a>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
