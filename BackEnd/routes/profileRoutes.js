import express from 'express';
import multer from 'multer';
import { uploadProfileImage, getLatestProfileImage } from '../controllers/profileController.js';
import fs from 'fs';

const router = express.Router();

// Multer storage config (moved from server.js)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('profileImage'), uploadProfileImage);
router.get('/latest', getLatestProfileImage);

export default router;
