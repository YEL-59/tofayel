import express from 'express';
import { recordVisit, getAnalyticsStats } from '../controllers/analyticsController.js';

const router = express.Router();

// Record a page view / visit
router.post('/visit', recordVisit);

// Get visitor stats for the Admin Dashboard
router.get('/stats', getAnalyticsStats);

export default router;
