import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import mongoose from 'mongoose';
import PDFDocument from 'pdfkit';
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
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
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

/**
 * Generate a clean, styled, professional PDF resume stream using pdfkit
 */
function generateResumePDF(res, { inline = false } = {}) {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `${inline ? 'inline' : 'attachment'}; filename="Tofayel_Islam_Resume.pdf"`
  );

  const doc = new PDFDocument({
    size: 'A4',
    margin: 40,
    info: {
      Title: 'Tofayel Islam - Resume',
      Author: 'Tofayel Islam',
      Subject: 'Full-Stack Developer Resume',
      Keywords: 'Full-Stack, React, Next.js, Node.js, Express, MongoDB, TypeScript',
    },
  });

  doc.pipe(res);

  const primaryColor = '#0f172a'; // slate 900
  const accentColor = '#4f46e5';  // indigo 600
  const secondaryColor = '#2563eb'; // blue 600
  const textColor = '#334155';    // slate 700
  const lightTextColor = '#64748b'; // slate 500
  const dividerColor = '#cbd5e1'; // slate 300

  // 1. Header Section
  doc.fontSize(22).font('Helvetica-Bold').fillColor(primaryColor).text('TOFAYEL ISLAM', { characterSpacing: 0.5 });
  doc.fontSize(11).font('Helvetica-Bold').fillColor(accentColor).text('FULL-STACK SOFTWARE ENGINEER | MERN & NEXT.JS SPECIALIST');
  doc.moveDown(0.3);

  // Contact Info Row
  doc.fontSize(8.5).font('Helvetica').fillColor(textColor)
    .text('Email: tofayeltuhin143@gmail.com   •   Phone: +880 1708-901418   •   Location: Dhaka, Bangladesh (Remote Worldwide)');
  doc.text('GitHub: https://github.com/yel-59   •   LinkedIn: https://linkedin.com   •   Portfolio: Live Interactive App');
  doc.moveDown(0.5);

  // Divider Line
  doc.strokeColor(dividerColor).lineWidth(1).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
  doc.moveDown(0.6);

  // 2. Professional Summary
  doc.fontSize(10.5).font('Helvetica-Bold').fillColor(secondaryColor).text('PROFESSIONAL SUMMARY');
  doc.moveDown(0.2);
  doc.fontSize(9).font('Helvetica').fillColor(textColor).text(
    'Dedicated and performance-oriented Full-Stack Developer with deep expertise in architecting scalable web applications using React, Next.js, TypeScript, Node.js, Express, and MongoDB. Proven track record in developing high-conversion digital platforms, modern glassmorphic design systems, and robust RESTful APIs. Passionate about clean code standards, responsive user interfaces, and cloud deployment pipelines.',
    { lineGap: 2.2 }
  );
  doc.moveDown(0.6);

  // 3. Technical Skills
  doc.fontSize(10.5).font('Helvetica-Bold').fillColor(secondaryColor).text('CORE TECHNICAL COMPETENCIES');
  doc.moveDown(0.25);

  const skills = [
    { label: 'Frontend Technologies', val: 'React.js, Next.js 14+ (App Router), TypeScript, Tailwind CSS, JavaScript (ES6+), Redux Toolkit, Framer Motion, HTML5/CSS3' },
    { label: 'Backend & APIs', val: 'Node.js, Express.js, RESTful API Architecture, JWT Authentication, Multer, Mongoose ORM, Middleware Pipelines' },
    { label: 'Databases & Cloud', val: 'MongoDB Atlas, MongoDB Compass, Cloudinary, Vercel, Render, AWS S3 Integrations' },
    { label: 'Tools & DevOps', val: 'Git, GitHub Actions, Docker basics, Postman, Vite, npm/yarn, Chrome DevTools' },
  ];

  skills.forEach((s) => {
    doc.fontSize(8.8).font('Helvetica-Bold').fillColor(primaryColor).text(`•  ${s.label}: `, { continued: true });
    doc.font('Helvetica').fillColor(textColor).text(s.val, { lineGap: 1.8 });
  });
  doc.moveDown(0.6);

  // 4. Featured Projects
  doc.fontSize(10.5).font('Helvetica-Bold').fillColor(secondaryColor).text('FEATURED TECHNICAL PROJECTS');
  doc.moveDown(0.25);

  const projects = [
    {
      title: '1. Production E-Commerce Application & Admin CMS',
      stack: 'React.js, Node.js, Express, MongoDB Atlas, Redux Toolkit, Stripe API, Tailwind CSS',
      points: [
        'Engineered an enterprise-grade full-stack online store with real-time cart persistence and Stripe payment integration.',
        'Created an extensive Admin Studio with live inventory metrics, order status management, and sales revenue analytics.',
        'Structured modular RESTful endpoints with MongoDB schema validation and token-based authentication.',
      ],
    },
    {
      title: '2. Interactive Developer Portfolio & CMS Platform',
      stack: 'React, TypeScript, Vite, Tailwind CSS, Express.js, MongoDB Atlas, Framer Motion',
      points: [
        'Built a modern interactive portfolio featuring dark glassmorphism styling, telemetry cards, and multi-category filters.',
        'Developed live Admin Studio CMS allowing instant project customization, like/view counters, and real-time visitor tracking.',
        'Engineered dynamic PDF resume generation with real-time in-browser previewing capabilities.',
      ],
    },
    {
      title: '3. Agile Task & Project Management Workspace',
      stack: 'Next.js, TypeScript, Tailwind CSS, Node.js, MongoDB',
      points: [
        'Designed drag-and-drop Kanban sprint board for collaborative task lifecycle management.',
        'Implemented live activity tracking and responsive dark-mode UI with optimized load times.',
      ],
    },
  ];

  projects.forEach((p) => {
    doc.fontSize(9.5).font('Helvetica-Bold').fillColor(primaryColor).text(p.title, { continued: true });
    doc.font('Helvetica-Oblique').fillColor(lightTextColor).text(`  |  ${p.stack}`);
    doc.moveDown(0.15);
    p.points.forEach((pt) => {
      doc.fontSize(8.5).font('Helvetica').fillColor(textColor).text(`   -  ${pt}`, { lineGap: 1.5 });
    });
    doc.moveDown(0.35);
  });

  // 5. Education & Background
  doc.fontSize(10.5).font('Helvetica-Bold').fillColor(secondaryColor).text('EDUCATION');
  doc.moveDown(0.2);
  doc.fontSize(9).font('Helvetica-Bold').fillColor(primaryColor).text('Bachelor of Science in Computer Science & Engineering (B.Sc. in CSE)', { continued: true });
  doc.font('Helvetica').fillColor(lightTextColor).text('   |   Dhaka, Bangladesh');
  doc.fontSize(8.5).font('Helvetica').fillColor(textColor).text('Focus: Data Structures, Algorithms, Web Application Engineering, Database Systems.');

  // Finish document
  doc.end();
}

// @desc    Upload new CV file
// @route   POST /api/cv/upload
export const uploadCVFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Please select a .pdf or document file.',
      });
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

    if (mongoose.connection.readyState === 1) {
      try {
        const profile = await Profile.findOne();
        if (profile) {
          profile.cvFileName = req.file.originalname;
          profile.cvFileUrl = `/api/cv/download`;
          profile.cvUpdatedAt = latestCV.uploadedAt;
          await profile.save();
        }
      } catch (dbErr) {
        console.warn('Could not update MongoDB profile with CV:', dbErr.message);
      }
    }

    res.status(200).json({
      success: true,
      message: 'CV uploaded successfully! Real-time PDF preview and download are active.',
      data: {
        fileName: req.file.originalname,
        size: req.file.size,
        downloadUrl: '/api/cv/download',
        previewUrl: '/api/cv/preview',
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

// @desc    Download the active CV file (Always returns a real PDF!)
// @route   GET /api/cv/download
export const downloadCV = (req, res) => {
  try {
    if (latestCV.path && fs.existsSync(latestCV.path)) {
      const ext = path.extname(latestCV.originalName).toLowerCase();
      if (ext === '.pdf') {
        res.setHeader('Content-Type', 'application/pdf');
      }
      return res.download(latestCV.path, latestCV.originalName);
    }

    // Dynamic High-Quality PDF Resume Generator
    generateResumePDF(res, { inline: false });
  } catch (error) {
    console.error('Error generating/downloading PDF resume:', error);
    res.status(500).send('Error downloading PDF file');
  }
};

// @desc    Preview the active CV file in browser (PDF inline stream)
// @route   GET /api/cv/preview
export const previewCV = (req, res) => {
  try {
    if (latestCV.path && fs.existsSync(latestCV.path)) {
      const ext = path.extname(latestCV.originalName).toLowerCase();
      if (ext === '.pdf') {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${latestCV.originalName}"`);
        const fileStream = fs.createReadStream(latestCV.path);
        return fileStream.pipe(res);
      }
    }

    // Dynamic High-Quality PDF Resume Stream for in-browser preview
    generateResumePDF(res, { inline: true });
  } catch (error) {
    console.error('Error previewing PDF resume:', error);
    res.status(500).send('Error previewing PDF file');
  }
};

// @desc    Get active CV info
// @route   GET /api/cv/info
export const getCVInfo = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      fileName: latestCV.originalName || 'Tofayel_Islam_Resume.pdf',
      hasCustomFile: Boolean(latestCV.path && fs.existsSync(latestCV.path)),
      size: latestCV.size,
      downloadUrl: '/api/cv/download',
      previewUrl: '/api/cv/preview',
      uploadedAt: latestCV.uploadedAt,
    },
  });
};
