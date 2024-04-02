import userServices from '../services/User.services';
import { Response, Request } from 'express';
import {
  ErrorResponse,
  ErrorResponseType,
  InvalidInput,
  MissingParameter,
} from '../utils/errorResponse';

interface ISignUp {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  username: string;
  role: string;
}
class User {
  async sign_up(req: Request<any, any, ISignUp>, res: Response) {
    try {
      const {name, username, password, phoneNumber, email, role } = req.body;

      if (!name || !username || !password || !email || !phoneNumber || !role) {
        throw new MissingParameter();
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^0\d{9}$/;
      const isValidPassword = (password: string): boolean => {
        // Regular expressions to check for uppercase, number, and special character
        const uppercaseRegex = /[A-Z]/;
        const numberRegex = /\d/;
        const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
        return (
          uppercaseRegex.test(password) &&
          numberRegex.test(password) &&
          specialCharRegex.test(password)
        );
      };

      if (!emailRegex.test(email) || !isValidPassword(password) || !phoneRegex.test(phoneNumber)) {
        throw new InvalidInput();
      }

      const newuser = await userServices.createUser(name, email, phoneNumber, password, username, role);

      if (newuser == '00') {
        return res.status(200).json({
          message: 'Have create a new user',
        });
      }

      throw new ErrorResponse('back end fail', 401);
    } catch (error: ErrorResponseType | any) {
      console.log(error);
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

// * thiet ke api : RESTful

const user = new User();
export default user;
// Check if the password meets all criteria

        // * login and sign up : authentication and authorization : jwt
        // * authorization : jwt

        // * voi lan api -> email+ password -> luu 2 cai nay vao client -> de mat email + password
        // * luu token (exp) -> client -> gui kem theo token ->
        // * jwt = { access_token : {exp : 2h}, refresh_token : { exp : 10 days} }
        // * jwt luu trong cookie
