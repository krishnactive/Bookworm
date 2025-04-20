import React from "react";

const Profile = () => {
  const user = {
    name: "Name",
    email: "test@example.com",
    avatar: "https://i.pravatar.cc/150?img=3", // placeholder avatar
    orders: ["book1", "course4"],
    favourites: ["book11", "cr11"],
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      {/* Header */}
      <div className="flex items-center space-x-6">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-20 h-20 rounded-full border-4 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* Orders */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-blue-600 mb-2">My Orders</h3>
        <ul className="list-disc pl-6">
          {user.orders.map((book, i) => (
            <li key={i}>{book}</li>
          ))}
        </ul>
      </div>

      {/* Favourites */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-pink-600 mb-2">Favourites</h3>
        <ul className="list-disc pl-6">
          {user.favourites.map((book, i) => (
            <li key={i}>{book}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
