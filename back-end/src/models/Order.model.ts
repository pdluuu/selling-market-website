import mongoose, { Schema, Document, Types } from "mongoose";
import { string } from "zod";

export interface IOrderProduct {
    product_id: string;
    store_id: string;
    quantity: string;
    price: string;
    discount: string;
}

export interface IOrder extends Document {
    _id: string;
    totalprice: string;
    status: string;
    date: string;
    user_id: string | Types.ObjectId;
    address: string;
    deliver_id: string | Types.ObjectId;
    phoneNumber: string;
    orderProduct: IOrderProduct;
}

const OrderSchema: Schema = new Schema({
    totalprice: { type: String, required: true },
    status: { type: String, required: true },
    date: { type: String, required: true },
    user_id: { type: String, ref: "User", required: true },
    address: { type: String, required: true },
    deliver_id: { type: String, ref: "User", required: true },
    phoneNumber: { type: String, required: true },
    orderProduct: {
        order_id: { type: String, ref: "Order", required: true },
        product_id: { type: String, ref: "Product", required: true },
        store_id: { type: String, ref: "Store", required: true },
        quantity: { type: String, required: true },
        price: { type: String, required: true },
        discount: { type: String, required: true },
    },
});

const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);
export default OrderModel;
