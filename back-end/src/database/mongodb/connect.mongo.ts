import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/selling-market-website';

// bat dong bo
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
