import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    const fetchCart = async () => {
      if (!authUser?._id || !authUser?.token) return;
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/cart/show`,
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );
        setCart(res.data.cart);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, [authUser]);

  const handleRemove = async (itemId, itemType) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/cart/remove`,
        {
          userId: authUser._id,
          itemId,
          itemType,
        },
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
      setCart((prev) =>
        prev.filter(
          (item) =>
            item.itemId._id !== itemId || item.itemType !== itemType
        )
      );
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };
  const handleCheckout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }), // total is in rupees
      });
  
      const order = await res.json();
  
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "kk",
        description: "Order Payment",
        image: "",
        order_id: order.id,
        handler: async function (response) {
          console.log("Payment Success:", response);
          alert("Payment Successful!");
        },
        prefill: {
          name: authUser.fullname,
          email: authUser.email,
          contact: authUser.phone,
        },
        theme: {
          color: "#347DFA",
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
    }
  };
  

  const total = cart.reduce((sum, item) => sum + (item.itemId?.price || 0),0).toFixed(2);

  return (
    <div className="max-w-5xl mx-auto mt-20 px-6">
      <h1 className="text-3xl font-bold mb-8 dark:text-white text-gray-800">
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300 text-lg">
          Your cart is currently empty.
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between gap-4 p-4 sm:p-6 bg-white dark:bg-slate-800 shadow-sm rounded-xl transition hover:shadow-md"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={item.itemId?.image}
                    alt={item.itemId?.title}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <div>
                    <h2 className="text-lg font-semibold dark:text-white text-gray-900">
                      {item.itemId?.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.itemId?.name}
                    </p>
                    <p className="mt-1 text-green-600 dark:text-green-400 font-medium">
                      ${item.itemId?.price}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    handleRemove(item.itemId?._id, item.itemType)
                  }
                  className="text-red-500 hover:text-red-700 p-2 rounded-full bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-800/40 transition"
                  title="Remove from cart"
                >
                  <FaTrash className="text-xl" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t pt-6 flex flex-col items-end">
            <p className="text-xl font-semibold dark:text-white text-gray-800">
              Total: <span className="text-blue-600">${total}</span>
            </p>
            <button
              to="/checkout"
              onClick={handleCheckout}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-medium shadow transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
