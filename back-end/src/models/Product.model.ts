import mongoose, { Schema, Document, Types } from "mongoose";

export enum ProductCategory {
    SmartPhone = "Smart Phone",
    Laptop = "Laptop",
    Tablet = "Tablet",
    SmartWatch = "Smart Watch",
    Accessories = "Accessories",
}

export enum SmartPhoneBrand {
    Apple = "Apple",
    Samsung = "Samsung",
    Huawei = "Huawei",
    Oppo = "Oppo",
    Xiaomi = "Xiaomi",
    Nokia = "Nokia",
}

export enum LapTopBrand {
    Asus = "Asus",
    Dell = "Dell",
    MacBook = "MacBook",
    Acer = "Acer",
    Hp = "Hp",
    Msi = "Msi",
}

export enum TabletBrand {
    Apple = "IPad",
    Samsung = "Samsung",
    Huawei = "Huawei",
    Oppo = "Oppo",
    Xiaomi = "Xiaomi",
    Nokia = "Nokia",
}

export enum AccessoriesBrand {
    Apple = "Apple",
    Samsung = "Samsung",
    Huawei = "Huawei",
    Oppo = "Oppo",
    Xiaomi = "Xiaomi",
    Nokia = "Nokia",
}

export interface IProduct extends Document {
    _id: string | Types.ObjectId;
    name: string;
    discount: number;
    price: number;
    brand: SmartPhoneBrand | TabletBrand | LapTopBrand | AccessoriesBrand;
    version: [string];
    category: ProductCategory;
    images: [string];
    items: [string];
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    discount: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    version: { type: [String] },
    category: { type: String, required: true },
    images: { type: [String], required: true },
    items: { type: [String], required: true, ref: "Product" },
});

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
