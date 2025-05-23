import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

export default function AddressPage() {
  const [authUser] = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  useEffect(() => {
    if (!authUser?.token) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/user/address`, {
      headers: { Authorization: `Bearer ${authUser.token}` },
    })
      .then(res => res.json())
      .then(data => setAddresses(data || []))
      .catch(console.error);
  }, [authUser]);

  const handleEdit = (address) => {
    setCurrentAddress(address);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!authUser?.token) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/address/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${authUser.token}` },
      });
      if (!res.ok) throw new Error("Delete failed");

      setAddresses(addresses.filter(addr => addr._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (!authUser?.token || !currentAddress) return;

    const { street, city, state, zipCode } = currentAddress;
    if (!street?.trim() || !city?.trim() || !state?.trim() || !zipCode?.trim()) {
      alert("All fields are required.");
      return;
    }

    try {
      const method = currentAddress._id ? "PUT" : "POST";
      const url = currentAddress._id
        ? `${import.meta.env.VITE_API_URL}/api/user/address/${currentAddress._id}`
        : `${import.meta.env.VITE_API_URL}/api/user/address`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.token}`,
        },
        body: JSON.stringify(currentAddress),
      });

      if (!res.ok) throw new Error("Save failed");

      const data = await res.json();

      if (method === "POST") {
        setAddresses([...addresses, data[data.length - 1]]); // Add the last new address
      } else {
        setAddresses(addresses.map(addr => (addr._id === data._id ? data : addr)));
      }

      setCurrentAddress(null);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen pt-20 bg-gray-100 dark:bg-gray-900">
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#347DFA] dark:text-blue-400">Manage Addresses</h2>
            <button
              onClick={() => {
                setCurrentAddress({ street: "", city: "", state: "", zipCode: "" });
                setIsEditing(true);
              }}
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
                      Edit
                    </button>
                    <button onClick={() => handleDelete(address._id)} className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isEditing && currentAddress && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#347DFA] dark:text-blue-400 mb-4">
                {currentAddress._id ? "Edit Address" : "Add Address"}
              </h3>
              <form onSubmit={(e) => e.preventDefault()}>
                {["street", "city", "state", "zipCode"].map((field) => (
                  <div className="mb-4" key={field}>
                    <label className="block text-sm text-gray-600 dark:text-gray-300 capitalize">{field}</label>
                    <input
                      type="text"
                      value={currentAddress?.[field] || ""}
                      onChange={(e) =>
                        setCurrentAddress((prev) => ({ ...prev, [field]: e.target.value }))
                      }
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded w-full"
                    />
                  </div>
                ))}
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white py-2 px-6 rounded-md mt-4"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentAddress(null);
                  }}
                  className="ml-2 py-2 px-6 rounded-md border border-gray-400 dark:border-gray-600"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
