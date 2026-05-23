import express from 'express';
import multer from 'multer';
import { createCard, getCards, deleteCard, getCardById } from '../controllers/cardController.js';
import fs from 'fs';

const router = express.Router();

// Multer storage config (consistent with profile)
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

router.post('/upload', upload.single('productImage'), createCard);
router.get('/', getCards);
router.get('/:id', getCardById);
router.delete('/:id', deleteCard);

export default router;
