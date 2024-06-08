<<<<<<< HEAD
import { Router } from 'express';
import product from '../../controller/Product.controller';
import { authenticateToken } from '../../middlerware/authentication';
=======
import { Router } from "express";
import product from "../../controller/Product.controller";
import { authenticateToken } from "../../middlerware/authentication";
>>>>>>> refs/remotes/origin/main

const productRouter = Router();
productRouter.post('/create-product', product.createProduct);
productRouter.post('/delete-product', authenticateToken, product.deleteProduct);

<<<<<<< HEAD
productRouter.post('/update-product', authenticateToken, product.updateProduct);
=======
productRouter.post("/create-product", authenticateToken, product.createProduct);
productRouter.post("/update-product", authenticateToken, product.updateProduct);
>>>>>>> refs/remotes/origin/main
//red: IProduct, res: {message: "Update successfully//Error"}
productRouter.post('/view-detail-product', product.viewDetailProduct);
productRouter.post('/view-product', product.viewProduct);
//req: {brand: string, price: number, category: string}
//example price: 1 -> find all product that price equal or greater than 10.000.000 and less than 20.000.000
//res: IProduct
<<<<<<< HEAD
=======
productRouter.post("/delete-product", authenticateToken, product.deleteProduct);
>>>>>>> refs/remotes/origin/main
//req: {id: string}, res: {message: "Delete successfully/Error"}
export default productRouter;
