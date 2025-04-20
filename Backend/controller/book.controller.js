import Book from "../model/book.model.js";

export const getBook = async (req, res) => {
  try {
    const books = await Book.find();

    // Add isFree field based on price
    const updatedBooks = books.map(book => ({
      ...book.toObject(),           // Convert Mongoose document to plain JS object
      isFree: book.price === 0      // Add isFree flag
    }));

    res.status(200).json(updatedBooks);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};
