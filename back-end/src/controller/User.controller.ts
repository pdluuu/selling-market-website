import userServices from '../services/User.services';
import { Response, Request } from 'express';
import {
  ErrorResponse,
  ErrorResponseType,
  InvalidInput,
  MissingParameter,
} from '../utils/errorResponse';

interface ISignUp {
  email: string;
  password: string;
  username: string;
}
class User {
  async sign_up(req: Request<any, any, ISignUp>, res: Response) {
    try {
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        throw new MissingParameter();
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const isValidPassword = (password: string): boolean => {
        // Regular expressions to check for uppercase, number, and special character
        const uppercaseRegex = /[A-Z]/;
        const numberRegex = /\d/;
        const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

        // Check if the password meets all criteria
        return (
          uppercaseRegex.test(password) &&
          numberRegex.test(password) &&
          specialCharRegex.test(password)
        );
      };

      if (!emailRegex.test(email) || !isValidPassword(password)) {
        throw new InvalidInput();
      }

      const newuser = await userServices.createUser(email, password, username);

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
