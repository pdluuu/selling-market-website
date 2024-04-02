import { ObjectId } from 'mongodb';
import mongoose, { Schema, Document } from 'mongoose';
import { string } from 'zod';

// Define the interface representing a user document
interface User extends Document {
  id: string;
  password: string;
  email: string;
  name: string;
  status?: string;
  username: string;
  role: 'user' | 'admin' | 'staff' | 'deliver';
  store_id?: string | null;
  phoneNumber: string;
}

// Define the schema for the user model
const userSchema: Schema = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, required: false },
  username: { type: String, required: true, unique:true },
  role: {
    type: String,
    enum: ['user', 'admin', 'staff', 'deliver'],
    required: true,
    default: 'user',
  },
  store_id: { type: String, default: null },
  phoneNumber: { type: String, required: true, unique: true },
});

// Create and export the User model
const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;
