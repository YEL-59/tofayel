import mongoose from 'mongoose';
import Experience from '../models/Experience.js';
import { initialExperiences } from '../utils/initialData.js';

const isDBConnected = () => mongoose.connection.readyState === 1;

export const getExperiences = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(200).json({
        success: true,
        source: 'fallback',
        count: initialExperiences.length,
        data: initialExperiences,
      });
    }

    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      source: 'database',
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve experiences',
      error: error.message,
    });
  }
};

export const createExperience = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({ success: false, message: 'Database not connected' });
    }
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, data: experience });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
