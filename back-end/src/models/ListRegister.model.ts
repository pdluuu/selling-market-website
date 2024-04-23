import mongoose, { Schema, Document } from "mongoose";

export interface IListRegister extends Document {
    userId: string;
    email: string;
    role: string;
}

const ListRegisterSchema: Schema = new Schema({
    userId: { type: String,ref: "User", required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
});

const ListRegisterModel = mongoose.model<IListRegister>("ListRegister", ListRegisterSchema);
export default ListRegisterModel;