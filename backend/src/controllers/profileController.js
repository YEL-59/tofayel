import mongoose from 'mongoose';
import Profile from '../models/Profile.js';

const isDBConnected = () => mongoose.connection.readyState === 1;

// Default profile configuration
export let memoryProfile = {
  greeting: "Hello, I'm",
  nameFirst: 'Tofayel',
  nameLast: 'Islam',
  role: 'Frontend Developer',
  bio: 'Crafting exceptional digital experiences with precision and creativity. Specializing in modern web technologies and user-centered design.',
  isAvailable: true,
  availableText: 'Available for Hire',
  technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
  socialLinks: {
    github: 'https://github.com/yel-59',
    linkedin: 'https://linkedin.com',
    email: 'tofayeltuhin143@gmail.com',
  },
  cvFileName: 'Tofayel_Islam_Resume.pdf',
  cvFileUrl: '/api/cv/download',
  cvUpdatedAt: new Date().toISOString(),
};

// @desc    Get profile / home settings
// @route   GET /api/profile
export const getProfile = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(200).json({
        success: true,
        source: 'memory',
        data: memoryProfile,
      });
    }

    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(memoryProfile);
    }

    res.status(200).json({
      success: true,
      source: 'database',
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile configuration',
      error: error.message,
    });
  }
};

// @desc    Update profile / home settings
// @route   PUT /api/profile
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    if (!isDBConnected()) {
      memoryProfile = {
        ...memoryProfile,
        ...updates,
        socialLinks: {
          ...memoryProfile.socialLinks,
          ...(updates.socialLinks || {}),
        },
      };

      return res.status(200).json({
        success: true,
        source: 'memory',
        message: 'Profile updated in memory! (Will persist to MongoDB when connected)',
        data: memoryProfile,
      });
    }

    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({ ...memoryProfile, ...updates });
    } else {
      Object.assign(profile, updates);
      await profile.save();
    }

    res.status(200).json({
      success: true,
      source: 'database',
      message: 'Profile updated successfully in MongoDB',
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message,
    });
  }
};
