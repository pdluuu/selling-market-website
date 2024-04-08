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
}

const userServices = new UserServices();
export default userServices;
