import { Router } from "express";
import user from "../../controller/User.controller";

const authRouter = Router();

authRouter.post("/sign-up", user.sign_up);
authRouter.post("/sign-in", user.sign_in);

export default authRouter;
