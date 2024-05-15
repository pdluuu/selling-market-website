import productServices from '../services/Product.services';
import jwt from 'jsonwebtoken';

import { Response, Request } from 'express';
import { ErrorResponse, ErrorResponseType, InvalidInput, MissingParameter } from '../utils/errorResponse';
import auhtService from '../services/auth.service';
import Logger from '../lib/logger';
import { IFailRes, ISignIn, ISignUp, ISuccessRes, ITokenWithRole } from '../utils/auth.interface';
import { IProduct } from '../models/Product.model';
import { config } from 'dotenv';
import { authenticateRole } from '../middlerware/role.authentication';
config();
class Product {
    async createProduct(req: Request<any, any, IProduct>, res: Response<ISuccessRes | IFailRes>) {
        try {
            const { name, brand, discount, version, price, category, images } = req.body;

            if (!name || !brand || !price || !category || !images) {
                throw new MissingParameter();
            }

            const product = await productServices.createProduct(
                name,
                brand,
                discount,
                version,
                price,
                category,
                images,
            );

            return res.status(200).json({
                message: 'Create successfully',
            });
        } catch (error: any) {
            console.log(error);

            const Err = new ErrorResponse(error.message as string, error.statusCode as number);

            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }
    async deleteProduct(req: Request, res: Response<ISuccessRes | IFailRes>) {
        try {
            authenticateRole(req, res, async () => {
                const { id } = req.body;
                const product = productServices.deleteProduct(id);
                return res.status(200).json({
                    message: 'Delete successfully',
                });
            });
        } catch (error: any) {
            // Logger.error(error);
            console.log(error);

            const Err = new ErrorResponse(error.message as string, error.statusCode as number);

            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }
    async updateProduct(req: Request<any, any, IProduct>, res: Response<ISuccessRes | IFailRes>) {
        try {
            authenticateRole(req, res, async () => {
                const { id, name, brand, discount, version, price, category, images ,items} = req.body;

                if (!name || !brand || !price || !category || !images) {
                    throw new MissingParameter();
                }

                const product = await productServices.updateProduct(req.body);

                return res.status(200).json({
                    message: 'Update successfully',
                });
            });
        } catch (error: any) {
            // Logger.error(error);
            console.log(error);

            const Err = new ErrorResponse(error.message as string, error.statusCode as number);

            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }
    async viewProduct(req: Request, res: Response) {
        try {
            const { brand, price, category } = req.body;

            const product = await productServices.viewProduct(brand, price, category);

            return res.status(200).json(product);
        } catch (error: any) {
            // Logger.error(error);
            console.log(error);

            const Err = new ErrorResponse(error.message as string, error.statusCode as number);

            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }
    async viewDetailProduct(req: Request, res: Response) {
        try {
            const { _id } = req.body;

            const product = await productServices.viewDetailProduct(_id);

            return res.status(200).json(product);
        } catch (error: any) {
            // Logger.error(error);
            console.log(error);

            const Err = new ErrorResponse(error.message as string, error.statusCode as number);

            return res.status(Err.statusCode).json({ message: Err.message });
        }
    }
}
const product = new Product();
export default product;
