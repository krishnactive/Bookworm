import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  const [authUser, setAuthUser] = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      console.log(authUser.token);
      console.log(authUser);
      if (!authUser?._id || !authUser?.token) return;
      try {
        
        const res = await axios.get("http://localhost:4001/user/cart/show", {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        });
        setCart(res.data.cart);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [authUser]);

  const handleRemove = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4001/user/${authUser._id}/cart/${itemId}`);
      setCart((prev) => prev.filter((item) => item.itemId.toString() !== itemId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };
  

  const total = cart.reduce((sum, item) => sum + (item.itemId?.price || 0), 0).toFixed(2);

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
                key={item._id}
                className="flex items-center justify-between p-4 border rounded-lg dark:bg-slate-800 dark:text-white"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.itemId?.image}
                    alt={item.itemId?.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.itemId?.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.itemId?.name}
                    </p>
                    <p className="text-green-600 dark:text-green-400 font-medium">
                      ${item.itemId?.price}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.itemId?._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove from cart"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold dark:text-white">Total: ${total}</p>
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
