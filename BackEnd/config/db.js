import mongoose from 'mongoose';

// Cache the connection across serverless invocations (avoids cold-start reconnects)
let cached = global.__mongoConnection;

if (!cached) {
    cached = global.__mongoConnection = { conn: null, promise: null };
}

const connectDB = async () => {
    // If already connected, return the existing connection
    if (cached.conn) {
        return cached.conn;
    }

    // If a connection is in progress, wait for it
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Don't buffer commands when disconnected
            maxPoolSize: 10,       // Reuse up to 10 socket connections
        };

        if (!process.env.DATA_BASE_URL) {
            throw new Error('DATA_BASE_URL environment variable is not defined.');
        }

        cached.promise = mongoose.connect(process.env.DATA_BASE_URL, opts)
            .then((mongoose) => {
                console.log('MongoDB connected:', mongoose.connection.host);
                return mongoose;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null; // Reset on failure so next call retries
        throw err;
    }

    return cached.conn;
};

export default connectDB;
