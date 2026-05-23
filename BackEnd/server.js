import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import connectDB from './config/db.js';
import profileRoutes from './routes/profileRoutes.js';
import cardRoutes from './routes/cardRoutes.js';
dotenv.config();

// Connect to Database
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use('/api/profile', profileRoutes); 
app.use('/api/cards', cardRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;



