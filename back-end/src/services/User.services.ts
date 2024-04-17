import UserModel from '../models/User.model';
import { ErrorResponse, InvalidInput } from "../utils/errorResponse";
import OrderModel from '../models/Order.model';
import ProductModel from '../models/Product.model';
class UserServices {
    async getUserByName(username: string) {
        const user = await UserModel.findOne({ username }).select('email name username status role');
        if (!user) {
            return {
                success: false,
                message: "User not found",
            };
        }
        return {
            success: true,
            user,
        };
    }

    async registerStaff(email: string, _id: string) {
        
        // Kiểm tra nếu user đã tồn tại
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return {
                success: false,
                message: "User dont't exists",
            };
        }
        
        const updatedUser = await UserModel.findOneAndUpdate(
            { email },
            { role: "staff" }, 
            { new: true } 
        );

        if (!updatedUser) {
            return {
                success: false,
                message: "Failed to update user role",
            };
        }

        return {
            success: true,
            message: "User registered as staff successfully",
        };
        
    }

    async registerDeliver(email: string, _id: string) {
        // Kiểm tra nếu user đã tồn tại
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return {
                success: false,
                message: "User dont't exists",
            };
        }
        
        const updatedUser = await UserModel.findOneAndUpdate(
            { email },
            { role: "deliver" }, 
            { new: true } 
        );

        if (!updatedUser) {
            return {
                success: false,
                message: "Failed to update user role",
            };
        }

        return {
            success: true,
            message: "User registered as deliver successfully",
        };
    }

    async takeOrder(product_id: string, user_id: string) {
      try {
          const product = await ProductModel.findOne({ _id: product_id });
          if (!product) {
              return {
                  success: false,
                  message: "Product not found",
              };
          }
  
          const user = await UserModel.findById(user_id);
          if (!user) {
              return {
                  success: false,
                  message: "User not found",
              };
          }
  
          let order = await OrderModel.findOne({ user_id: user_id });
          if (!order) {
              const orderData = {
                  totalprice: product.price || "0",
                  status: "pending",
                  date: new Date().toISOString(),
                  user_id: user_id,
                  address: "xxxx", 
                  deliver_id: "xxxxx", 
                  phoneNumber: user.phoneNumber,
                  orderProduct: [], 
              };
              order = await OrderModel.create(orderData);
          }
  
          order.orderProduct.push({
              product_id: product_id,
              store_id: "Your store ID here", 
              quantity: "1", 
              price: product.price || "0",
              discount: (product.discount || "0").toString(),
          });
  
          let totalPrice = 0;
          for (const item of order.orderProduct) {
              totalPrice += parseFloat(item.price) * parseFloat(item.discount);
          }
  
          order.totalprice = totalPrice.toString();

          await order.save();
          return {
              success: true,
              message: "takeOrder successfully",
          };
      } catch (error) {
          console.error("Error in takeOrder:", error);
          return {
              success: false,
              message: "Failed to take order",
          };
      }
  }
  

    async updateUser(_id:string,name:string,  username:string,password: string, email:string, mobile:string) {
 
        if (
            (await this.isExistEmail(email)) ||
            (await this.isExistUsername(username))
        ) {
            throw new InvalidInput("Email already exists");
        }
        const data: { name:string;username: string;password:string ,email: string; mobile: string} = { name,username,password, email, mobile };
        const response = await UserModel.findByIdAndUpdate(_id, data, { new: true }).select('-password -role -refreshToken');
        if(response){
            return {
                success: true,
                message: "found user and update",
            };
        }else{
            return {
                success: false,
                message: "not found user",
            };
        }
        
    }
    async isExistEmail(email: string) {
        const user = await UserModel.findOne({ email }).lean().exec();

        if (user) {
            return true;
        }
        return false;
    }
    async isExistUsername(username: string) {
        const user = await UserModel.findOne({ username }).lean().exec();
        if (user) {
            return true;
        }
        return false;
    }

    tao_nguoi_dung(email: string, password: string): string {
        // ket noi database de tao nguoi dung
        if (1) {
            return "ok";
        }
        return "no ok";
    }

}

const userServices = new UserServices();
export default userServices;
