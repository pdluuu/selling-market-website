import { Router } from "express";
import product from "../../controller/Product.control";

const productRouter = Router();

productRouter.post("/",product.get_info);

export default productRouter;