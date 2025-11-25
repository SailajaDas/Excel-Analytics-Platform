import express from "express";
import contact from "../models/contact.model.js";


const router = express.Router();

// Save contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const newContact = new contact({ name, email, phone, subject, message });
    await newContact.save();

    res.status(201).json({ message: "Contact message saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// (Optional) Get all contact messages
router.get("/", async (req, res) => {
  try {
    const contacts = await contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
