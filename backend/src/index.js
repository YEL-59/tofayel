import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';

// Route imports
import projectRoutes from './routes/projectRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import cvRoutes from './routes/cvRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Flexible CORS configuration for Local & Production (Vercel, Netlify, Custom Domains)
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((u) => u.trim().replace(/\/$/, ''))
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, health checks)
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, '');
      if (
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(cleanOrigin) ||
        cleanOrigin.endsWith('.vercel.app') ||
        cleanOrigin.endsWith('.netlify.app') ||
        cleanOrigin.includes('localhost') ||
        cleanOrigin.includes('127.0.0.1')
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Allow all legitimate origins in production
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

// Static uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Root Endpoint (Prevents Render 404s on GET /)
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  res.status(200).json({
    status: 'online',
    message: 'Tofayel Portfolio MERN Backend API is running successfully 🚀',
    database: dbStatus === 1 ? 'Connected to MongoDB Atlas' : 'Running offline fallback',
    endpoints: {
      health: '/api/health',
      profile: '/api/profile',
      projects: '/api/projects',
      cvInfo: '/api/cv/info',
      cvDownload: '/api/cv/download',
      messages: '/api/messages',
    },
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'Disconnected (Running offline fallback)',
    1: 'Connected to MongoDB',
    2: 'Connecting...',
    3: 'Disconnecting...',
  };

  res.status(200).json({
    status: 'online',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: {
      connected: dbStatus === 1,
      status: statusMap[dbStatus] || 'Unknown',
    },
    service: 'Tofayel Portfolio MERN Backend API',
  });
});

// API Routes
app.use('/api/profile', profileRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experiences', experienceRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? null : err.message,
  });
});

// Start Server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 [MERN Backend Server] is running on port ${PORT}`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🩺 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`📁 Clients Allowed: ${allowedOrigins.join(', ')}`);
    console.log(`======================================================\n`);
  });
};

startServer();
