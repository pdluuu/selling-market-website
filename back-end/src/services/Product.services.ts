import { ObjectId } from 'mongodb';
import ProductModel, { IProduct } from '../models/Product.model';
import { InvalidInput } from '../utils/errorResponse';
import { crossOriginResourcePolicy } from 'helmet';

class ProductServices {
    async createProduct(
        name: string,
        brand: string,
        discount: number,
        version: string[],
        price: number,
        category: string,
        images: string[],
        items: string[],
    ): Promise<string> {
        // ket noi database de tao san pham
        try {
            const new_product = await ProductModel.create({ name, brand, discount, version, price, category, images,items });
            return '00';
        } catch (error) {
            console.log(error);
            throw new InvalidInput();
        }
    }
    async deleteProduct(id: string): Promise<string> {
        try {
            const deleted_product = await ProductModel.deleteOne({ _id: new ObjectId(id) });
            return '00';
        } catch (error) {
            console.log(error);
            return '01';
        }
    }
    async updateProduct(obj: IProduct): Promise<string> {
        // ket noi database de tao san pham
        try {
            const new_product = await ProductModel.updateOne({ _id: new ObjectId(obj._id) }, { $set: obj });
            return '00';
        } catch (error) {
            console.log(error);
            return '01';
        }
    }
    async viewProduct(brand: string, price: number, category: string) {
        try {
            let query: { category?: string; brand?: string; price?: any } = {};

      if (brand) {
        query.brand = brand;
      }

      if (price > -1) {
        const g = 10000000 * price;
        const l = 10000000 * price + 10000000;
        query.price = { $lt: l, $gte: g };
      }

            if (category) {
                query.category = category;
            }
            const result = ProductModel.find(query);
            
            return result;
        } catch (error) {
            console.log(error);
            return '01';
        }
    }
    async viewDetailProduct(_id: ObjectId) {
        try {
            const result = ProductModel.find({ _id: _id });

      return result;
    } catch (error) {
      console.log(error);
      return "01";
    }
  }
}

const productServices = new ProductServices();
export default productServices;