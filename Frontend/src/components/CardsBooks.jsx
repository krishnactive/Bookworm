import React from "react";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import AuthProvider, { useAuth } from "../context/AuthProvider";

function Cards({ item, course }) {
  const [authUser] = useAuth();
  const data = item || course;
  const handleClick = async() =>{
    // console.log("Add to Cart clicked");
    const itemType = item ? "books" : "courses";
    const userId = authUser?._id;
    // Log to verify userId and item data
    console.log("userId:", userId);
    console.log("Item Type:", itemType);
    console.log("Item Data:", data);
    
    if (!userId) {
      console.log("User ID is not found in localStorage");
      alert("Please log in first");
      return;
    }
    try{
      const res = await axios.post("http://localhost:4001/user/cart/add", {
        userId,
        itemId: data._id,
        itemType,
      });
      console.log("data received",res.data);
    }
    catch(error){
      console.log("error",error);
    }
  }
  if (!data) return null;

  return (
    <div className="mt-4 my-2 p-2">
      <div className="card card-side flex bg-base-100 shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure className="w-1/3">
          <img
            src={data.image}
            alt={data.title || "Card"}
            className="w-full h-full object-cover rounded-l-lg"
          />
        </figure>
        <div className="card-body p-4 w-2/3">
          <div className="flex justify-between items-start">
            <h2 className="card-title text-lg font-semibold">{data.title}</h2>
            {data.category && (
              <span className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-md">
                {data.category}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {data.author}
          </p>
          <div className="card-actions justify-between items-end mt-auto">
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              ${data.price}
            </span>
            <div className="flex gap-2 items-center">
              {/* Add to Cart Button with Tooltip */}
              <div className="tooltip" data-tip="Add to Cart">
                <button
                  onClick = {()=>handleClick()}
                  className="p-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200"
                >
                  <FaPlus size={12} />
                </button>
              </div>
              {/* Buy Now Button */}
              <button className="px-4 py-1 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-200">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
