import express from 'express';
import { getExperiences, createExperience } from '../controllers/experienceController.js';

const router = express.Router();

router.route('/').get(getExperiences).post(createExperience);

export default router;
