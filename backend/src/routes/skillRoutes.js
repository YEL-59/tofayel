import express from 'express';
import { getSkills, createSkill } from '../controllers/skillController.js';

const router = express.Router();

router.route('/').get(getSkills).post(createSkill);

export default router;
