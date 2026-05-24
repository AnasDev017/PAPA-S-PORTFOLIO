import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db.js';
import profileRoutes from './routes/profileRoutes.js';
import cardRoutes from './routes/cardRoutes.js';

dotenv.config();

// Check environment variables
if (!process.env.DATA_BASE_URL) {
    console.error("CRITICAL ERROR: DATA_BASE_URL is not defined. Check your .env or Vercel environment variables.");
}

// Connect to MongoDB
connectDB();

const app = express();

// CORS
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// =====================
//   API Routes
// =====================

// Health check
// GET /
app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Portfolio Backend API is running",
        endpoints: {
            profile: {
                upload: "POST /api/profile/upload",
                latest: "GET  /api/profile/latest",
            },
            cards: {
                create: "POST   /api/cards/upload",
                getAll: "GET    /api/cards",
                getOne: "GET    /api/cards/:id",
                delete: "DELETE /api/cards/:id",
            }
        }
    });
});

app.use('/api/profile', profileRoutes);
app.use('/api/cards', cardRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        message: `Route '${req.url}' not found`,
        availableRoutes: [
            "GET  /",
            "GET  /api/profile/latest",
            "POST /api/profile/upload",
            "GET  /api/cards",
            "POST /api/cards/upload",
            "GET  /api/cards/:id",
            "DELETE /api/cards/:id",
        ]
    });
});

// Only listen locally — Vercel doesn't need app.listen()
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export default app;
