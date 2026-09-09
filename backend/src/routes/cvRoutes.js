import express from 'express';
import { upload, uploadCVFile, downloadCV, getCVInfo } from '../controllers/cvController.js';

const router = express.Router();

router.post('/upload', upload.single('cv'), uploadCVFile);
router.get('/download', downloadCV);
router.get('/info', getCVInfo);

export default router;
