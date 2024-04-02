import { Router } from "express";
import product from "../controller/Product.controller";

const productRouter = Router();
const human_authenticateToken = require('../middleware/human_authenticateToken.middleware');

productRouter.post("/add-product", human_authenticateToken, product.them_san_pham);
// productRouter.post("/add-product", product.them_san_pham);
export default productRouter;