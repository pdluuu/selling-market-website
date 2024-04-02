import mongoose, { Schema, Document } from "mongoose";
export interface IUser extends Document {
    _id: string;
    password: string;
    email: string;
    name?: string | null;
    username: string;
    status: "inactive" | "active" | "banned";
    role: "user" | "deliver" | "admin" | "staff";
    store_id?: string;
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
        role: {
            type: String,
            enum: ["user", "deliver", "admin", "staff"],
            required: true,
            default: "user",
        },
        store_id: { type: String },
    },
    { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
