<<<<<<< HEAD
import UserModel from "../models/User.model";

class UserServices {
  // * tao nguoi dung
  async createUser(
    email: string,
    password: string,
    username: string
  ): Promise<string> {
    try {
      const new_user = await UserModel.create({ email, password, username });
      return "00";
    } catch (error) {
      console.log(error);

      return "01";
    }
    // ket noi database de tao nguoi dung
  }

  async loginUser(email: string, password: string): Promise<string> {
    console.log("start login");

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return "02";
      }
      if (user.password != password) {
        return "03";
      }
      return "00";
    } catch (error) {
      console.log(error);
      return "01";
    }
  }
=======
import { ObjectId } from "mongoose";
import UserModel from "../models/User.model";

class UserServices {
    tao_nguoi_dung(email: string, password: string): string {
        // ket noi database de tao nguoi dung
        if (1) {
            return "ok";
        }
        return "no ok";
    }
    async extractUserRole(user_id: ObjectId): Promise<string> {
        try {
            const user = await UserModel.findById(user_id);
    
            if (!user) {
                throw new Error('Id is not existed'); // User not found
            }
    
            return user.role; // Return role of user
        } catch (error) {
            throw new Error('Error checking user role');
        }
    }
>>>>>>> KLinh/QuanlySP
}

const userServices = new UserServices();
export default userServices;
