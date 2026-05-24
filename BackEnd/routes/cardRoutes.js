import express from 'express';
import upload from '../config/multer.js';
import { createCard, getCards, deleteCard, getCardById } from '../controllers/cardController.js';

const router = express.Router();

// POST   /api/cards/upload  → Create a new service card (with image upload)
router.post('/upload', upload.single('productImage'), createCard);

// GET    /api/cards          → Get all service cards
router.get('/', getCards);

// GET    /api/cards/:id      → Get a single card by ID
router.get('/:id', getCardById);

// DELETE /api/cards/:id      → Delete a card (+ Cloudinary image)
router.delete('/:id', deleteCard);

export default router;
