import productServices from "../services/Product.services";
import {
    ErrorResponse,
    ErrorResponseType,
    InvalidInput,
    MissingParameter,
  } from '../utils/errorResponse';
class Product {
    async them_san_pham(req: any, res: any) {
        try {
            const {  name,
                discount,
                price,
                image,
                brand,
                version,
                category} = req.body;
            if (!name || !discount || !price || !image || !brand || !version || !category) {
                throw new MissingParameter();
            }
            console.log("Received data:", req.body);
            const mess = productServices.them_product(
                name,discount, price,image, brand,version, category
            );

            return res.status(200).json({
                message: mess,
            });
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({
                error: "Internal server error",
            });
        }
    }
}

const product = new Product();
export default product;