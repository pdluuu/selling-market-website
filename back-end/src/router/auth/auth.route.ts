import { Router } from "express";
import user from "../../controller/User.controller";

const authRouter = Router();

authRouter.post("/sign-up", user.sign_up);
// TODO : RES : 200 : { access_token: string, refresh_token: string}
// TODO : RES : 400 : { message: "Email have been use"}
// TODO : RES : 400 : {message: "Missing paramete"}
// TODO : RES : 400 : {message: "Invalid value"}

authRouter.post("/sign-in", user.sign_in);
authRouter.post("/google-auth", user.googleAuth);
authRouter.post("/forgot-password/getCode", user.password_getcode);
authRouter.post("/forgot-password/reset-password", user.reset_pass);
authRouter.post("/get-access-token", user.get_access_token);
authRouter.post("/sendCode", user.sendCode);
authRouter.post("/verifyUser", user.verifyUser);

export default authRouter;
