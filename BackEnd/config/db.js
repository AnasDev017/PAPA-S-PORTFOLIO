import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATA_BASE_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.error("Tip: If you see ENOTFOUND, it's a DNS issue. Try using the 'Standard Connection String' from MongoDB Atlas (not the SRV one).");
    }
};

export default connectDB;
