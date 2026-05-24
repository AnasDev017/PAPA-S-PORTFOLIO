import cloudinary from '../config/cloudinary.js';
import ServiceCard from '../models/ServiceCard.js';
import fs from 'fs';

// Helper to safely delete local temp file
const deleteTempFile = (filePath) => {
    try {
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (err) {
        console.warn('Could not delete temp file:', err.message);
    }
};

// POST /api/cards/upload
export const createCard = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!req.file || !title || !description) {
            deleteTempFile(req.file?.path);
            return res.status(400).json({ message: 'All fields are required: title, description, and productImage' });
        }

        // Enforce 6-card limit
        const cardCount = await ServiceCard.countDocuments();
        if (cardCount >= 6) {
            deleteTempFile(req.file.path);
            return res.status(400).json({ message: 'Maximum limit of 6 cards reached. Please delete a card first.' });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'papa_portfolio/cards',
            resource_type: 'image',
        });

        // Save card to MongoDB
        const newCard = new ServiceCard({
            title,
            description,
            image: result.secure_url,
            cloudinaryId: result.public_id
        });

        await newCard.save();
        deleteTempFile(req.file.path);

        res.status(201).json({
            message: 'Service card created successfully',
            data: newCard
        });
    } catch (error) {
        deleteTempFile(req.file?.path);
        console.error('Card Creation Error:', error);
        res.status(500).json({ message: 'Server error during card creation', error: error.message });
    }
};

// GET /api/cards
export const getCards = async (req, res) => {
    try {
        const cards = await ServiceCard.find().sort({ createdAt: -1 });
        res.status(200).json(cards);
    } catch (error) {
        console.error('Fetch Cards Error:', error);
        res.status(500).json({ message: 'Server error fetching cards', error: error.message });
    }
};

// GET /api/cards/:id
export const getCardById = async (req, res) => {
    try {
        const card = await ServiceCard.findById(req.params.id);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (error) {
        console.error('Fetch Card Error:', error);
        res.status(500).json({ message: 'Server error fetching card', error: error.message });
    }
};

// DELETE /api/cards/:id
export const deleteCard = async (req, res) => {
    try {
        const card = await ServiceCard.findById(req.params.id);

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Remove image from Cloudinary
        if (card.cloudinaryId) {
            await cloudinary.uploader.destroy(card.cloudinaryId);
        }

        await ServiceCard.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        console.error('Delete Card Error:', error);
        res.status(500).json({ message: 'Server error deleting card', error: error.message });
    }
};
