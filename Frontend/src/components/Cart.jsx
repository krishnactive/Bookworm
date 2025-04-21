import React from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

// Sample cart data (replace with context or real state)
const sampleCart = [
  {
    id: 1,
    title: "The Art of Coding",
    author: "Jane Doe",
    price: 29.99,
    image: "https://placehold.co/100x100",
  },
  {
    id: 2,
    title: "Advanced React",
    author: "John Smith",
    price: 34.99,
    image: "https://placehold.co/100x100",
  },
];

function Cart() {
  const [cart, setCart] = React.useState(sampleCart);

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto mt-24 px-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg dark:bg-slate-800 dark:text-white"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.author}
                    </p>
                    <p className="text-green-600 dark:text-green-400 font-medium">
                      ${item.price}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove from cart"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold dark:text-white">
              Total: ${total}
            </p>
            <Link
              to="/checkout"
              className="inline-block mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
