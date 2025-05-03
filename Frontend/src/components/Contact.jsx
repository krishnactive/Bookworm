import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setSuccessMessage("Response submitted. We will contact you soon.");
        setFormData({ name: "", email: "", message: "" });

        setTimeout(() => {
          setSuccessMessage("");
        }, 4000);
      } else {
        alert("Something went wrong: " + result.error);
      }
    } catch (err) {
      alert("Failed to send message: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f0ff] to-white dark:from-gray-900 dark:to-gray-800 px-6 py-20 flex items-center justify-center">
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10 max-w-3xl w-full border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          Get in Touch ✉️
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Have a question or want to work together? Fill out the form below!
        </p>

        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 text-center text-green-700 bg-green-100 border border-green-300 p-3 rounded-lg"
          >
            {successMessage}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message
            </label>
            <textarea
              name="message"
              required
              rows="5"
              maxLength={1000}
              value={formData.message}
              onChange={(e) => {
                const wordCount = e.target.value.trim().split(/\s+/).length;
                if (wordCount <= 100) {
                  handleChange(e);
                }
              }}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
