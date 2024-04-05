import { Router } from "express";
import product from "../../controller/Product.controller";

const productRouter = Router();

productRouter.post("/create-product", product.createProduct);
productRouter.post("/update-product", product.updateProduct);
productRouter.post("/view-product", product.viewProduct);
productRouter.post("/delete-product", product.deleteProduct);

export default productRouter;