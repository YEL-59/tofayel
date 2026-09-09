import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import mongoose from 'mongoose';
import Profile from '../models/Profile.js';
import { memoryProfile } from './profileController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directory exists
const uploadDir = path.resolve(__dirname, '../../uploads/cv');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    cb(null, `${baseName}_${Date.now()}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only .pdf, .doc, and .docx files are allowed!'));
    }
  },
});

// Store latest uploaded file reference in memory
let latestCV = {
  originalName: 'Tofayel_Islam_Resume.pdf',
  filename: null,
  path: null,
  size: 0,
  uploadedAt: new Date().toISOString(),
};

// Check if any existing file is in the uploads directory on startup
try {
  const existing = fs.readdirSync(uploadDir);
  if (existing.length > 0) {
    const sorted = existing
      .map((f) => ({ name: f, time: fs.statSync(path.join(uploadDir, f)).mtime.getTime() }))
      .sort((a, b) => b.time - a.time);
    const newest = sorted[0];
    const stat = fs.statSync(path.join(uploadDir, newest.name));
    latestCV = {
      originalName: newest.name,
      filename: newest.name,
      path: path.join(uploadDir, newest.name),
      size: stat.size,
      uploadedAt: new Date(stat.mtime).toISOString(),
    };
  }
} catch (err) {
  // directory read error ignored
}

const isDBConnected = () => mongoose.connection.readyState === 1;

// @desc    Upload new CV file
// @route   POST /api/cv/upload
export const uploadCVFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select a file to upload' });
    }

    latestCV = {
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      uploadedAt: new Date().toISOString(),
    };

    memoryProfile.cvFileName = req.file.originalname;
    memoryProfile.cvFileUrl = `/api/cv/download`;
    memoryProfile.cvUpdatedAt = latestCV.uploadedAt;

    if (isDBConnected()) {
      let profile = await Profile.findOne();
      if (profile) {
        profile.cvFileName = req.file.originalname;
        profile.cvFileUrl = `/api/cv/download`;
        profile.cvUpdatedAt = latestCV.uploadedAt;
        await profile.save();
      }
    }

    console.log(`📄 [CV Uploaded] ${req.file.originalname} (${(req.file.size / 1024).toFixed(1)} KB)`);

    res.status(200).json({
      success: true,
      message: 'CV uploaded successfully!',
      data: {
        fileName: req.file.originalname,
        size: req.file.size,
        downloadUrl: '/api/cv/download',
        uploadedAt: latestCV.uploadedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error uploading file',
    });
  }
};

// @desc    Download the active CV file
// @route   GET /api/cv/download
export const downloadCV = (req, res) => {
  try {
    if (latestCV.path && fs.existsSync(latestCV.path)) {
      return res.download(latestCV.path, latestCV.originalName);
    }

    // Fallback: If no custom file has been uploaded yet, generate a clean text resume dynamically
    const fallbackText = `
TOFAYEL ISLAM - FRONTEND DEVELOPER
Email: tofayeltuhin143@gmail.com | Phone: 01708901418
Location: Dhaka, Bangladesh | GitHub: https://github.com/yel-59
----------------------------------------------------------------------
PROFESSIONAL SUMMARY
Crafting exceptional digital experiences with precision and creativity.
Specializing in modern web technologies and user-centered design.

CORE TECHNOLOGIES
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Redux, HTML5/CSS3
- Backend: Node.js, Express.js, MongoDB, REST APIs
- Tools: Git, GitHub, Docker, Postman, Vite

PROJECT HIGHLIGHTS
1. E-Commerce Platform - Full-stack solution with real-time inventory and Stripe payments.
2. Task Management App - Drag-and-drop collaborative workspace with TypeScript.
3. Portfolio Website - Modern interactive portfolio built with React & Framer Motion.
----------------------------------------------------------------------
(Uploaded via Portfolio Admin Dashboard)
    `.trim();

    res.setHeader('Content-Disposition', 'attachment; filename="Tofayel_Islam_Resume.txt"');
    res.setHeader('Content-Type', 'text/plain');
    res.send(fallbackText);
  } catch (error) {
    res.status(500).send('Error downloading file');
  }
};

// @desc    Get active CV info
// @route   GET /api/cv/info
export const getCVInfo = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      fileName: latestCV.originalName,
      hasCustomFile: Boolean(latestCV.path && fs.existsSync(latestCV.path)),
      size: latestCV.size,
      downloadUrl: '/api/cv/download',
      uploadedAt: latestCV.uploadedAt,
    },
  });
};
