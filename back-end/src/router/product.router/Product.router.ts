import { Router } from "express";
import product from "../../controller/Product.controller";
import { authenticateRole } from "../../middlerware/role.authentication";

const productRouter = Router();

productRouter.post("/create-product", authenticateRole, product.createProduct);
productRouter.post("/update-product", authenticateRole, product.updateProduct);
//red: IProduct, res: {message: "Update successfully//Error"}
productRouter.post("/view-detail-product", product.viewDetailProduct);
productRouter.post("/view-product", product.viewProduct);
//req: {brand: string, price: number, category: string}
//example price: 1 -> find all product that price equal or greater than 10.000.000 and less than 20.000.000
//res: IProduct
productRouter.post("/delete-product", authenticateRole, product.deleteProduct);
//req: {id: string}, res: {message: "Delete successfully/Error"}
export default productRouter;