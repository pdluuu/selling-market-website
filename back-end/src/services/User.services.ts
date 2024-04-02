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
      const users = await UserModel.find();
      console.log(users);
      const user = await UserModel.findOne({ email });
      if (!user) {
        console.log("02");
        return "02";
      }
      if (user.password != password) {
        console.log("03");
        return "03";
      }
      console.log("00");
      return "00";
    } catch (error) {
      console.log(error);
      return "01";
    }
  }
}

const userServices = new UserServices();
export default userServices;
