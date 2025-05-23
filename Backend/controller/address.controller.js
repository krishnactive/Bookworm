import User from "../model/user.model.js";

// Create a new address
export const createAddress = async (req, res) => {
  const userId = req.user._id;
  const { street, city, state, zipCode } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.address.push({ street, city, state, zipCode });
    await user.save();

    res.status(201).json(user.address);
  } catch (err) {
    console.error("Error creating address:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Update an existing address
export const updateAddress = async (req, res) => {
  const userId = req.user._id;
  const addressId = req.params.id;
  const { street, city, state, zipCode } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const address = user.address.id(addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });

    address.street = street;
    address.city = city;
    address.state = state;
    address.zipCode = zipCode;

    await user.save();
    res.status(200).json(address);
  } catch (err) {
    console.error("Error updating address:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Delete an address
export const deleteAddress = async (req, res) => {
  const userId = req.user._id;
  const addressId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.address = user.address.filter(addr => addr._id.toString() !== addressId);
    await user.save();

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (err) {
    console.error("Error deleting address:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get all addresses
export const getAddresses = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.address);
  } catch (err) {
    console.error("Error fetching addresses:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
