import { Router } from "express";
import user from "../../controller/User.controller";
import GoogleAuth from "./auth.google";
const authRouter = Router();

authRouter.post("/sign-up", user.sign_up);
// TODO : RES : 200 : { access_token: string, refresh_token: string}
// TODO : RES : 400 : { message: "Email have been use"}

authRouter.post("/sign-in", user.sign_in);
authRouter.use(GoogleAuth);
export default authRouter;
