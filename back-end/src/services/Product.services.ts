import ProductModel from '../models/Product.model';
import {
    ErrorResponse,
    ErrorResponseType,
    InvalidInput,
    MissingParameter,
  } from '../utils/errorResponse';


class ProductServices {

    async them_product(
        name:string,
        discount:string, 
        price:string ,
        image: string, 
        brand: string,
        version:string,
        category: string
    ): Promise<string> {
      try {
        const new_product = await ProductModel.create({         
            name,discount, price,image, brand,version, category});
        return '00';
      } catch (error) {
        console.log(error);
  
        return '01';
      }
      // ket noi database de tao nguoi dung
    }
  }
  


const productServices = new ProductServices();
export default productServices;
