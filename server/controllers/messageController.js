import Message from "../models/message.js";

const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message, livingType, city } = req.body;
    if (!name || !email || !message || !livingType || !city) {
      return res.status(400).json({ error: "Name, email, message, livingType, and city are required." });
    }

    const newMessage = new Message({ name, email, subject, message, livingType, city });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error creating message:", error); // Log the actual error
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export { createMessage, getMessages, deleteMessage };