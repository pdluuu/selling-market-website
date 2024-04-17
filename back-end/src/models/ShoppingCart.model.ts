import mongoose, { Schema, Document } from "mongoose";

export interface IShoppingCartProduct {
    product_id: string;
    quantity: number;
}

export interface IShoppingCart extends Document {
    _id: string;
    user_id: string;
    cartProduct: [IShoppingCartProduct];
}

const ShoppingCartSchema: Schema = new Schema(
    {
        user_id: { type: String, ref: "User", require: true },
        cartProduct: [
            {
                product_id: { type: String, ref: "Product", require: true },
                quantity: { type: Number, require: true, default: 1 },
            },
        ],
    },
    { timestamps: true }
);

const ShoppingCartModel = mongoose.model<IShoppingCart>(
    "ShoppingCart",
    ShoppingCartSchema
);
export default ShoppingCartModel;