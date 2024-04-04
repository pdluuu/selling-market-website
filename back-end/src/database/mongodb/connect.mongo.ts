// db.ts
import { config } from "dotenv";
import mongoose from "mongoose";

config();
const MONGODB_URI = process.env.MONGODB_URI;

// bat dong bo
export const connectDB = async () => {
    try {
        if (MONGODB_URI) {
            mongoose.connect(MONGODB_URI);
            console.log("MongoDB connected succesxsfully");
        } else throw new Error();
    } catch (error) {
        console.error("Error connecting to MongoDB");
    }
};
