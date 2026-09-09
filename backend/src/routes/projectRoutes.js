import express from 'express';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  likeProject,
  recordView,
} from '../controllers/projectController.js';

const router = express.Router();

router.route('/').get(getProjects).post(createProject);
router.route('/:id').get(getProjectById).put(updateProject).delete(deleteProject);
router.post('/:id/like', likeProject);
router.post('/:id/view', recordView);

export default router;

