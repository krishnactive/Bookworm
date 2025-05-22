import React from "react";
import { FaPlus } from "react-icons/fa"; // Make sure react-icons is installed

function Cards({ item, course }) {
  const data = item ?? course;

  const addToCart = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // if you're using auth
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"), // or get from context
        itemId: data._id,
        itemType: item ? "books" : "courses",
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Added to cart!");
    } else {
      alert(result.message || "Error adding to cart");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong.");
  }
};




  if (!data) return null;

  return (
    <div className="mt-4 my-2 p-2">
      <div className="card w-92 text-sm bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img src={data.image} alt={data.title || "Card"} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {data.title}
            {data.category && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-md">
                {data.category}
              </span>
            )}
          </h2>
          <p>{data.author}</p>
          <div className="card-actions justify-between items-center mt-2">
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              ${data.price}
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200">
                Buy Now
              </button>
              <button 
               title="Add to Cart"
                onClick={addToCart}
               className="p-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200">
               
                <FaPlus size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
