import { Request, Response, Router } from "express";
import userRouter from "./user.router/User.router";
import { config } from "dotenv";
import authRouter from "./auth/auth.route";
import { authenticateToken } from "../middlerware/authentication";
import user from "../controller/User.controller";
config();

// * router
const api_version = process.env.API_VERSION || "/api/v1";

const appRouter = Router();

appRouter.use("/auth", authRouter);

appRouter.get("/hello", (req, res) => {
    return res.json("asd");
});

appRouter.use(authenticateToken).delete("/log-out", user.logout);
appRouter.use(authenticateToken).post("/take-order", (req: any, res: any) => {
    // * xu li take order
    // * can co userId and productId

    const { user } = req;
    const { product_id } = req.body;
    console.log(user, product_id);
    return res.status(200).json({ message: "take order" });
});

export default appRouter;
