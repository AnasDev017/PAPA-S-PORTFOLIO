import cloudinary from '../config/cloudinary.js';
import ServiceCard from '../models/ServiceCard.js';
import fs from 'fs';

export const createCard = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!req.file || !title || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check 6-card limit
        const cardCount = await ServiceCard.countDocuments();
        if (cardCount >= 6) {
            // Delete local file if limit reached
            if (req.file.path) fs.unlinkSync(req.file.path);
            return res.status(400).json({ message: 'Maximum limit of 6 cards reached' });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'papa_portfolio/cards',
        });

        // Save to MongoDB
        const newCard = new ServiceCard({
            title,
            description,
            image: result.secure_url,
            cloudinaryId: result.public_id
        });

        await newCard.save();

        // Delete local file
        fs.unlinkSync(req.file.path);

        res.status(201).json({
            message: 'Service card created successfully',
            data: newCard
        });
    } catch (error) {
        console.error('Card Creation Error:', error);
        res.status(500).json({ message: 'Server Error during card creation', error: error.message });
    }
};

export const getCards = async (req, res) => {
    try {
        const cards = await ServiceCard.find().sort({ createdAt: -1 });
        res.status(200).json(cards);
    } catch (error) {
        console.error('Fetch Cards Error:', error);
        res.status(500).json({ message: 'Server Error fetching cards', error: error.message });
    }
};

export const deleteCard = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await ServiceCard.findById(id);
        
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Delete from Cloudinary
        if (card.cloudinaryId) {
            await cloudinary.uploader.destroy(card.cloudinaryId);
        }

        // Delete from MongoDB
        await ServiceCard.findByIdAndDelete(id);

        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        console.error('Delete Card Error:', error);
        res.status(500).json({ message: 'Server Error deleting card', error: error.message });
    }
};

export const getCardById = async (req, res) => {
    try {
        const { id } = req.params;
        const card = await ServiceCard.findById(id);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.status(200).json(card);
    } catch (error) {
        console.error('Fetch Card Error:', error);
        res.status(500).json({ message: 'Server Error fetching card', error: error.message });
    }
};

