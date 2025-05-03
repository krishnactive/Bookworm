import Contact from "../model/message.model.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(201).json({ message: "Message submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit message." });
  }
};
