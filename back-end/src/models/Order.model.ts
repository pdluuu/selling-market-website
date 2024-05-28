import mongoose, { Schema, Document, Types, now } from 'mongoose';
import { string } from 'zod';

export interface IOrderProduct {
    product_id: string;
    store_id?: string;
    quantity: string;
    price: string | number;
    discount: string;
    status?: string;
}
export interface IOrder extends Document {
    _id: string;
    totalprice: string;
    date: string;
    user_id: string | Types.ObjectId;
    address: string;
    deliver_id?: string | Types.ObjectId;
    phoneNumber: string;
    status: string;
    orderProduct: IOrderProduct[];
}

const OrderSchema: Schema = new Schema({
    totalprice: { type: String, required: true },
    date: { type: String, required: true, default: now() },
    user_id: { type: String, ref: 'User', required: true },
    address: { type: String, required: true },
    deliver_id: { type: String, ref: 'User' },
    phoneNumber: { type: String, required: true },
    status: { type: String, require: true, default: 'pending' },
    orderProduct: [
        {
            product_id: { type: String, ref: 'Product', required: true },
            store_id: { type: String, ref: 'Store' },
            quantity: { type: String, required: true },
            price: { type: Schema.Types.Mixed, required: true },
            discount: { type: String, required: true, default: '0' },
            status: { type: String },
        },
    ],
});

const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
export default OrderModel;
