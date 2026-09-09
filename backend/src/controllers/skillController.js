import mongoose from 'mongoose';
import Skill from '../models/Skill.js';
import { initialSkills } from '../utils/initialData.js';

const isDBConnected = () => mongoose.connection.readyState === 1;

export const getSkills = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(200).json({
        success: true,
        source: 'fallback',
        count: initialSkills.length,
        data: initialSkills,
      });
    }

    const skills = await Skill.find().sort({ level: -1 });
    res.status(200).json({
      success: true,
      source: 'database',
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve skills',
      error: error.message,
    });
  }
};

export const createSkill = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({ success: false, message: 'Database not connected' });
    }
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
