import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import connectDB from './config/db.js';
import profileRoutes from './routes/profileRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
dotenv.config();

// Debug: Check if Environment Variables are loaded
if (!process.env.DATA_BASE_URL) {
    console.error("CRITICAL ERROR: DATA_BASE_URL is not defined. Check your Vercel Environment Variables.");
}

// Connect to Database
connectDB();

const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple Request Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Root Route
app.get("/", (req, res) => {
    res.json({ message: "Portfolio Backend API is running..." });
});

// Alias for common mistake
app.get("/latest", (req, res) => {
    res.redirect("/api/profile/latest");
});

// Routes
app.use('/api/profile', profileRoutes); 
app.use('/api/cards', cardRoutes); 

// Only listen if not running as a Vercel Serverless Function
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;



