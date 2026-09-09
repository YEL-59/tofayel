import mongoose from 'mongoose';
import Message from '../models/Message.js';

const isDBConnected = () => mongoose.connection.readyState === 1;

// In-memory message store for fallback when DB is offline
const inMemoryMessages = [];

// @desc    Submit contact message
// @route   POST /api/messages
export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields',
      });
    }

    if (!isDBConnected()) {
      const savedMessage = {
        _id: `offline_${Date.now()}`,
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        read: false,
        createdAt: new Date().toISOString(),
      };
      inMemoryMessages.push(savedMessage);

      console.log('\n📩 [New Contact Message - Offline Mode]:');
      console.log(`From: ${name} <${email}>`);
      console.log(`Subject: ${subject || 'No subject'}`);
      console.log(`Message: ${message}\n`);

      return res.status(201).json({
        success: true,
        source: 'memory',
        message: 'Message received successfully! (Stored in server memory until MongoDB URI is configured)',
        data: savedMessage,
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject: subject || 'General Inquiry',
      message,
    });

    console.log(`\n📩 [New Contact Message - Stored in MongoDB from: ${name} <${email}>]`);

    res.status(201).json({
      success: true,
      source: 'database',
      message: "Thank you for reaching out! Your message was saved to MongoDB and I'll get back to you soon.",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message,
    });
  }
};

// @desc    Get all contact messages
// @route   GET /api/messages
export const getMessages = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(200).json({
        success: true,
        source: 'memory',
        count: inMemoryMessages.length,
        data: inMemoryMessages,
      });
    }

    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      source: 'database',
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve messages',
      error: error.message,
    });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isDBConnected()) {
      const idx = inMemoryMessages.findIndex((m) => m._id === id);
      if (idx !== -1) {
        inMemoryMessages.splice(idx, 1);
        return res.status(200).json({ success: true, message: 'Message deleted from memory' });
      }
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted from database',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete message',
      error: error.message,
    });
  }
};
