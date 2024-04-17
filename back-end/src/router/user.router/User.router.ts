
import { Router } from "express";
import user from "../../controller/User.controller";
import { authenticateToken } from "../../middlerware/authentication";

const userRouter = Router();

userRouter.post("/sign-up", user.sign_up);
userRouter.get("/getUser:username", user.GetUserByName);
userRouter.post("/staff-registration",user.RegisterStaff);
userRouter.post("/deliver-registration",user.RegisterDeliver);
userRouter.post("/take-order",authenticateToken,user.TakeOrder);
userRouter.put("/update-infomation",user.UpdateUser);
export default userRouter
