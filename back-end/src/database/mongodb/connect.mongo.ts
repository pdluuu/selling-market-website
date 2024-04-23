// db.ts
import { config } from "dotenv";
import mongoose from "mongoose";

config();
const MONGODB_URI = 'mongodb+srv://linhlaai84:QAIIRpLsVCQDor7u@cluster0.cvvdnrs.mongodb.net/selling-market-website?retryWrites=true&w=majority&appName=Cluster0';

// bat dong bo
export const connectDB = async () => {
    try {
        if (MONGODB_URI) {
            mongoose.connect(MONGODB_URI);
            console.log("MongoDB connected successfully");
        } else throw new Error();
    } catch (error) {
        console.error("Error connecting to MongoDB");
    }
};
