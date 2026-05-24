import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db.js';
import profileRoutes from './routes/profileRoutes.js';
import cardRoutes from './routes/cardRoutes.js';

dotenv.config();

if (!process.env.DATA_BASE_URL) {
    console.error("CRITICAL ERROR: DATA_BASE_URL is not defined.");
    process.exit(1);
}

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.json({ status: "ok", message: "Portfolio Backend API is running (local)" });
});

app.use('/api/profile', profileRoutes);
app.use('/api/cards', cardRoutes);

app.use((req, res) => {
    res.status(404).json({ message: `Route '${req.url}' not found` });
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Connect first, then start server
connectDB()
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    });     