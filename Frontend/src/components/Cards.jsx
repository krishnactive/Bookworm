import React from "react";

function Cards({ item, course }) {
  const data = item || course; // fallback logic

  if (!data) return null;

  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure>
          <img src={data.image} alt={data.title || "Card"} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {data.title}
            {data.category && (
              <div className="badge badge-secondary">{data.category}</div>
            )}
          </h2>
          <p>{data.author}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline">${data.price}</div>
            <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
              Buy Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
// import React from "react";