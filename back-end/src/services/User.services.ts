import UserModel from '../models/User.model';

class UserServices {
  // * tao nguoi dung
  async createUser(
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    username: string,
    role: string
  ): Promise<string> {
    try {
      const new_user = await UserModel.create({ name, email, phoneNumber, password, username, role });
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
