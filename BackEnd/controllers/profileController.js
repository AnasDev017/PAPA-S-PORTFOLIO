import cloudinary from '../config/cloudinary.js';
import Profile from '../models/Profile.js';
import fs from 'fs';

export const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'papa_portfolio/profile',
        });

        // Save URL to MongoDB
        // We can either update an existing profile or create a new one. 
        // For now, let's create a new entry as a history or just the latest.
        const newProfile = new Profile({
            profileImage: result.secure_url
        });

        await newProfile.save();

        // Delete local file after upload
        fs.unlinkSync(req.file.path);

        res.status(200).json({
            message: 'Image uploaded to Cloudinary and saved to DB',
            url: result.secure_url,
            data: newProfile
        });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ message: 'Server Error during upload', error: error.message });
    }
};

export const getLatestProfileImage = async (req, res) => {
    try {
        const latestProfile = await Profile.findOne().sort({ createdAt: -1 });
        if (!latestProfile) {
            return res.status(404).json({ message: 'No profile image found' });
        }
        res.status(200).json(latestProfile);
    } catch (error) {
        console.error('Fetch Error:', error);
        res.status(500).json({ message: 'Server Error fetching profile image', error: error.message });
    }
};

