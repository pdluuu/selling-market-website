import mongoose, { Schema, Document, Types } from 'mongoose';
import { string } from 'zod';

export interface IOrderProduct {

    product_id: string;
    store_id: string;
    quantity: number;
    price: string | number;
    discount: string;
    version: string;
    
}
export interface IOrder extends Document {
    _id: string;
    totalprice: string;
    date: string;
    user_id: string | Types.ObjectId;
    address: string;
    deliver_id: string | Types.ObjectId;
    phoneNumber: string;
    status: string;
    orderProduct: IOrderProduct[];
}

const OrderSchema: Schema = new Schema({
    totalprice: { type: String, required: true },
    date: { type: String, required: true },
    user_id: { type: String, ref: 'User', required: true },
    address: { type: String, required: true },
    deliver_id: { type: String, ref: 'User', required: true },
    phoneNumber: { type: String, required: true },
    status: {type:String, required:true},
    orderProduct: [
        {

            product_id: { type: String, ref: 'Product', required: true },
            store_id: { type: String, ref: 'Store', required: true },
            quantity: { type: Number, required: true },
            price: { type: Schema.Types.Mixed, required: true },
            discount: { type: String, required: true },
            version: { type: String, required: true , default:1},
        },
    ],
});

const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
export default OrderModel;
