import { Router } from "express";
import userRouter from "./user.router/User.router";
import { config } from "dotenv";
import authRouter from "./auth/auth.route";
import { authenticateToken } from "../middlerware/authentication";
import user from "../controller/User.controller";
import productRouter from "./product.router/Product.router"
config();

// * router
const api_version = process.env.API_VERSION || "/api/v1";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/product", productRouter);
appRouter.use(authenticateToken).delete("/log-out", user.logout);

export default appRouter;
