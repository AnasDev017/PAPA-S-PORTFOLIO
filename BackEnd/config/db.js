import mongoose from 'mongoose';

let cached = global.__mongoConnection;

if (!cached) {
    cached = global.__mongoConnection = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        if (!process.env.DATA_BASE_URL) {
            throw new Error('DATA_BASE_URL environment variable is not defined.');
        }

        const opts = {
            bufferCommands: true,   // ← FIXED: must be true in serverless to avoid race conditions
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,  // ← NEW: fail fast if MongoDB is unreachable (10s)
            socketTimeoutMS: 45000,           // ← NEW: avoid hanging sockets
        };

        cached.promise = mongoose.connect(process.env.DATA_BASE_URL, opts)
            .then((mongooseInstance) => {
                console.log('MongoDB connected:', mongooseInstance.connection.host);
                return mongooseInstance;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        throw err;
    }

    return cached.conn;
};

export default connectDB;