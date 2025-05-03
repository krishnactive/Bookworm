import { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function AddressPage() {
  const [authUser, setAuthUser] = useAuth();
  const [addresses, setAddresses] = useState(authUser?.addresses || []);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const handleEdit = (address) => {
    setIsEditing(true);
    setCurrentAddress(address);
  };

  const handleDelete = async (addressId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/address/${addressId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete address.");
      }
      setAddresses(addresses.filter(address => address._id !== addressId));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleSave = async () => {
    const token = authUser?.token;
    if (!token) {
      console.error("No token found.");
      return;
    }
  
    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing
        ? `${import.meta.env.VITE_API_URL}/api/user/address/${currentAddress._id}`
        : `${import.meta.env.VITE_API_URL}/api/user/address`;
  
        const body = { ...currentAddress };

  
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save address.");
      }
  
      const result = await response.json();
      if (isEditing) {
        setAddresses(addresses.map((address) =>
          address._id === currentAddress._id ? result : address
        ));
      } else {
        setAddresses([...addresses, result]);
      }
  
      setIsEditing(false);
      setCurrentAddress(null);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };
  
  
  return (
    <div className="flex min-h-screen pt-20 bg-gray-100 dark:bg-gray-900">
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#347DFA] dark:text-blue-400">Manage Addresses</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="text-[#347DFA] dark:text-blue-400 hover:underline text-sm"
            >
              Add New Address
            </button>
          </div>

          {addresses.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No addresses added yet.</p>
          ) : (
            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address._id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                  <p className="text-sm text-gray-800 dark:text-white">{address.street}</p>
                  <p className="text-sm text-gray-800 dark:text-white">{address.city}</p>
                  <p className="text-sm text-gray-800 dark:text-white">{address.state}</p>
                  <p className="text-sm text-gray-800 dark:text-white">{address.zipCode}</p>
                  <div className="flex justify-end gap-2 mt-3">
                    <button onClick={() => handleEdit(address)} className="text-blue-500 hover:text-blue-700">
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(address._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isEditing && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#347DFA] dark:text-blue-400 mb-4">
                {currentAddress ? "Edit Address" : "Add Address"}
              </h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 dark:text-gray-300">Street</label>
                  <input
                    type="text"
                    value={currentAddress?.street || ""}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, street: e.target.value })}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 dark:text-gray-300">City</label>
                  <input
                    type="text"
                    value={currentAddress?.city || ""}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, city: e.target.value })}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 dark:text-gray-300">State</label>
                  <input
                    type="text"
                    value={currentAddress?.state || ""}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, state: e.target.value })}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 dark:text-gray-300">Zip Code</label>
                  <input
                    type="text"
                    value={currentAddress?.zipCode || ""}
                    onChange={(e) => setCurrentAddress({ ...currentAddress, zipCode: e.target.value })}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded w-full"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white py-2 px-6 rounded-md mt-4"
                >
                  {currentAddress ? "Save Changes" : "Add Address"}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
