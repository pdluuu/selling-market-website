import mongoose, { Schema, Document } from "mongoose";

export enum UserRole {
    User = "user",
    Deliver = "deliver",
    Admin = "admin",
    Staff = "staff",
}

export enum UserStatus {
    Active = "active",
    Inactive = "inactive",
    Banned = "banned",
}
export interface IUser extends Document {
    _id: string;
    password: string;
    email: string;
    name?: string | null;
    username: string;
    status: UserStatus;
    role: UserRole;
    phoneNumber: string;
    store_id?: string;
    image?: string;
}

const UserSchema: Schema = new Schema(
    {
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        name: { type: String },
        username: { type: String, required: true, unique: true },
        status: {
            type: String,
            enum: ["inactive", "active", "banned"],
            required: true,
            default: "inactive",
        },
        phoneNumber: { type: String },
        role: {
            type: String,
            enum: ["user", "deliver", "admin", "staff"],
            required: true,
            default: "user",
        },
        store_id: { type: String },
        image: { type: String },
    },
    { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;