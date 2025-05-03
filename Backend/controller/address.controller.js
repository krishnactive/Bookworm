const Address = require('../model/address.model');

exports.createOrUpdateAddress = async (req, res) => {
    const { street, city, state, zipCode } = req.body;
    const userId = req.user._id;
  
    try {
      const existingAddress = await Address.findOne({ userId });
      if (existingAddress) {
        existingAddress.street = street;
        existingAddress.city = city;
        existingAddress.state = state;
        existingAddress.zipCode = zipCode;
  
        const updatedAddress = await existingAddress.save();
        return res.status(200).json(updatedAddress);
      }
  
      const newAddress = new Address({
        street,
        city,
        state,
        zipCode,
        userId,
      });
  
      const savedAddress = await newAddress.save();
      return res.status(201).json(savedAddress);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };
  

exports.updateAddress = async (req, res) => {
  const { street, city, state, zipCode } = req.body;
  const addressId = req.params.id;

  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      { street, city, state, zipCode },
      { new: true }
    );
    if (!updatedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }
    return res.status(200).json(updatedAddress);
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  const addressId = req.params.id;

  try {
    const deletedAddress = await Address.findByIdAndDelete(addressId);
    if (!deletedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }
    return res.status(200).json({ message: 'Address deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
