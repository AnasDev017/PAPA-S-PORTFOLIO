import express from 'express';
import upload from '../config/multer.js';
import { uploadProfileImage, getLatestProfileImage } from '../controllers/profileController.js';

const router = express.Router();

// POST  /api/profile/upload  → Upload a new profile image
router.post('/upload', upload.single('profileImage'), uploadProfileImage);

// GET   /api/profile/latest  → Get the most recent profile image URL
router.get('/latest', getLatestProfileImage);

export default router;
