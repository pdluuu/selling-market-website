import { Router } from "express";
import user from "../controller/User.controller";

const userRouter = Router();

userRouter.post("/sign-up", user.sign_up);
userRouter.post("/sign-in", user.sign_in);

export default userRouter;
