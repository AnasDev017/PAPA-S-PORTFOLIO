import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import profileRoutes from '../routes/profileRoutes.js';
import cardRoutes from '../routes/cardRoutes.js';

dotenv.config();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Connect to MongoDB before handling any request ──────────────────────────
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        return res.status(503).json({ message: 'Database unavailable. Please try again later.' });
    }
});

// ─── Request Logger ───────────────────────────────────────────────────────────
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Portfolio Backend API is running',
        endpoints: {
            profile: {
                upload: 'POST /api/profile/upload',
                latest: 'GET  /api/profile/latest',
            },
            cards: {
                create: 'POST   /api/cards/upload',
                getAll: 'GET    /api/cards',
                getOne: 'GET    /api/cards/:id',
                delete: 'DELETE /api/cards/:id',
            }
        }
    });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/profile', profileRoutes);
app.use('/api/cards', cardRoutes);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({
        message: `Route '${req.method} ${req.url}' not found`,
        availableRoutes: [
            'GET    /',
            'GET    /api/profile/latest',
            'POST   /api/profile/upload',
            'GET    /api/cards',
            'POST   /api/cards/upload',
            'GET    /api/cards/:id',
            'DELETE /api/cards/:id',
        ]
    });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

// ─── Export for Vercel ────────────────────────────────────────────────────────
// Vercel needs a plain Express app exported as default — NO serverless-http wrapper
export default app;