import UserModel from '../models/User.model';

class UserServices {
  // * tao nguoi dung
  async createUser(
    email: string,
    password: string,
    username: string
  ): Promise<string> {
    try {
      const new_user = await UserModel.create({ email, password, username });
      return '00';
    } catch (error) {
      console.log(error);

      return '01';
    }
    // ket noi database de tao nguoi dung
  }
}

const userServices = new UserServices();
export default userServices;