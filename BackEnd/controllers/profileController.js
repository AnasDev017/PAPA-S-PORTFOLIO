import cloudinary from '../config/cloudinary.js';
import Profile from '../models/Profile.js';
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

// POST /api/profile/upload
export const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded. Please attach a profileImage.' });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'papa_portfolio/profile',
            resource_type: 'image',
        });

        // Save new profile record to MongoDB
        const newProfile = new Profile({
            profileImage: result.secure_url,
            cloudinaryId: result.public_id
        });

        await newProfile.save();
        deleteTempFile(req.file.path);

        res.status(200).json({
            message: 'Profile image uploaded successfully',
            url: result.secure_url,
            data: newProfile
        });
    } catch (error) {
        deleteTempFile(req.file?.path);
        console.error('Profile Upload Error:', error);
        res.status(500).json({ message: 'Server error during profile upload', error: error.message });
    }
};

// GET /api/profile/latest
export const getLatestProfileImage = async (req, res) => {
    try {
        const latestProfile = await Profile.findOne().sort({ createdAt: -1 });
        if (!latestProfile) {
            return res.status(404).json({ message: 'No profile image found. Upload one via the admin panel.' });
        }
        res.status(200).json(latestProfile);
    } catch (error) {
        console.error('Fetch Profile Error:', error);
        res.status(500).json({ message: 'Server error fetching profile image', error: error.message });
    }
};
