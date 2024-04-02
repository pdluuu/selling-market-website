//mongodb+srv://mailinhv534:<password>@cluster0.ju3utcb.mongodb.net/

// db.ts
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://mailinhv534:150303@cluster0.bdfmz00.mongodb.net/selling_market_website?retryWrites=true&w=majority&appName=Cluster0';

// bat dong bo
export const connectDB = async () => {
  try {
    mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// C => exe
// a -> doi 3s b -> c

// javascript -> runtime
// a
// b 3s
// c
// a -> c -> b
// Promise doi Promise return

// * dung portges, => sql
// * mongo -> csdl theo huong documents