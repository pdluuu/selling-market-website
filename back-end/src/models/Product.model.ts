import { ObjectId } from 'mongodb';
import mongoose, { Schema, Document } from 'mongoose';
import { string } from 'zod';

// Define the interface representing a user document
interface Product extends Document {
  id: string;
  name: string;
  discount?: string;
  price: string;
  image: string;
  brand: string;
  version: string;
  category: string;
  
}

// Define the schema for the user model
const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  discount: { type: String, required: false },
  price: { type: String, required: true },
  image: {
    type: String,
    required: true,
  },
  brand: {type:String, required:true},
  version: { type: String, required: false },
  category: { type: String, required: false },
});

// Create and export the User model
const ProductModel = mongoose.model<Product>('Product', productSchema);

export default ProductModel;
