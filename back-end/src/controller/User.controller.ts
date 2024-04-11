import userServices from "../services/User.services";
import jwt from "jsonwebtoken";

import { Response, Request } from "express";
import {
  ErrorResponse,
  ErrorResponseType,
  InvalidInput,
  MissingParameter,
} from "../utils/errorResponse";
import authService from "../services/auth.service";
import Logger from "../lib/logger";
import {
  IFailRes,
  IForgotPassEmail,
  IResetPass,
  ISignIn,
  ISignUp,
  ISuccessRes,
  IToken,
  IVertifyUser,
} from "../utils/auth.interface";
import { genSaltSync, hash, hashSync } from "bcrypt";
import { config } from "dotenv";
import authRouter from "../router/auth/auth.route";
import UserModel from "../models/User.model";
config();

class User {
  async sign_up(
    req: Request<any, any, ISignUp>,
    res: Response<ISuccessRes | IFailRes>
  ) {
    try {
      const { email, password, username } = req.body;

      if (!email || !password || !username) {
        throw new MissingParameter();
      }

      if (
        !authService.validate("email", email) ||
        !authService.validate("password", password)
      ) {
        throw new InvalidInput();
      }

      const user = await authService.signUp(email, password, username);

      const payload = {
        _id: user._id,
        email: user.email,
      };

      // * accesstoken la dang ma hoa cua { id, email } can co khoa

      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET || "",
        { expiresIn: process.env.EXPIRES_TOKEN_TIME }
      );

      const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET || ""
      );

      await authService.addTokens(refreshToken, user._id);

      return res.status(200).json({
        message: "successful",
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error: any) {
      // Logger.error(error);
      console.log(error);

      const Err = new ErrorResponse(
        error.message as string,
        error.statusCode as number
      );

      return res.status(Err.statusCode).json({ message: Err.message });
    }
  }

  async sign_in(
    req: Request<any, any, ISignIn>,
    res: Response<ISuccessRes | IFailRes>
  ) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new MissingParameter();
      }

      if (
        !authService.validate("email", email) ||
        !authService.validate("password", password)
      ) {
        throw new InvalidInput(); // * return
      }

      const user = await authService.signIn(email, password);

      const payload = {
        _id: user._id,
        email: user.email,
      };

      // phien ban ma hoa
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET || "",
        { expiresIn: process.env.EXPIRES_TOKEN_TIME }
      );
      // ma hoa + key -> phien ban chua decode

      // * save refresh Token vao database => lay lai access Token
      // * luu 1 chuoi cac access token => nhieu ng dung cung dang nhap cung mot luc
      // * xoa refreshToken tren dien thoai
      // * xoa luon []

      const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET || ""
      );

      await authService.addTokens(refreshToken, user._id);

      return res.status(200).json({
        message: "successful",
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error: any) {
      // Logger.error(error);
      console.log(error);

      const Err = new ErrorResponse(
        error.message as string,
        error.statusCode as number
      );

      return res.status(Err.statusCode).json({ message: Err.message });
    }
  }

  async logout(
    req: Request<any, any, IToken>,
    res: Response<ISuccessRes | IFailRes>
  ) {
    try {
      const { userId, refreshToken } = req.body;

      const Token_id = await authService.removeToken(userId, refreshToken);

      return res.status(204).json({ message: "logged out!" });
    } catch (error: any) {
      console.log(error);

      const Err = new ErrorResponse(
        error.message as string,
        error.statusCode as number
      );

      return res.status(Err.statusCode).json({ message: Err.message });
    }
  }
  async googleAuth() { }

  async password_getcode(
    req: Request<any, any, IForgotPassEmail>,
    res: Response<ISuccessRes | IFailRes>
  ) {
    const { email } = req.body;
    try {
      const { email } = req.body;

      if (!email) {
        throw new MissingParameter();
      }
      if (!authService.validate("email", email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const sendCode = await authService.sendCodePassword(email);

      return res.status(200).json({
        message: "Verify your email"
      })
    } catch (error: any) {
      console.log(error);

      const Err = new ErrorResponse(
        error.message as string,
        error.statusCode as number
      );

      return res.status(Err.statusCode).json({ message: Err.message });
    }
  }

  async reset_pass(
    req: Request<any, any, IResetPass>,
    res: Response<ISuccessRes | IFailRes>
  ) {
    try {
      const { email, resetCode, password } = req.body;

      if (!email || !resetCode || !password) {
        throw new MissingParameter();
      }
      if (!authService.validate("email", email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      if (!authService.validate("password", password)) {
        return res.status(400).json({ message: "Invalid password format" });
      }

      var result = await authService.resetPassword(email, resetCode, password);
      if (result === 200) {
        const user = await UserModel.findOne({ email: email });
        if (user) {
          const salt = genSaltSync(10);
          const hash = hashSync(password, salt);
          user.password = hash;
          await user.save();
          console.log(hash);
          
          const payload = {
            _id: user._id,
            email: user.email,
          };

          // phien ban ma hoa
          const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET || "",
            { expiresIn: process.env.EXPIRES_TOKEN_TIME }
          );
          // ma hoa + key -> phien ban chua decode

          // * save refresh Token vao database => lay lai access Token
          // * luu 1 chuoi cac access token => nhieu ng dung cung dang nhap cung mot luc
          // * xoa refreshToken tren dien thoai
          // * xoa luon []

          const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET || ""
          );

          await authService.addTokens(refreshToken, user._id);
          return res.status(200).json({
            message: "successful",
            data: {
              accessToken,
              refreshToken
            }
          })
        }
      }

      if (result === 400) {
        return res.status(400).json({
          message: "Invalid verification passcode"
        })
      }

      if (result === 404) {
        return res.status(404).json({
          message: "User not found"
        })
      }

      if (result === 408) {
        return res.status(408).json({
          message: "Ma het hieu luc"
        })
      }
    } catch (error: any) {
      console.log(error);
      const Err = new ErrorResponse(
        error.message as string,
        error.statusCode as number
      );

      return res.status(Err.statusCode).json({ message: Err.message });
    }
  }

  async sendCode(
    req: Request<any, any, IForgotPassEmail>,
    res: Response<ISuccessRes | IFailRes>
  ) {
    try {
      const { email } = req.body;

      if (!email) {
        throw new MissingParameter();
      }
      if (!authService.validate("email", email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      const sendCode = await authService.sendCode(email);

      return res.status(200).json({
        message: "Verification code sent successfully"
      })

    } catch (error: any) {
      console.log(error);

      const Err = new ErrorResponse(
        error.message as string,
        error.statusCode as number
      );

      return res.status(Err.statusCode).json({ message: Err.message });
    }
  }

  async verifyUser(
    req: Request<any, any, IVertifyUser>,
    res: Response<ISuccessRes | IFailRes>
  ) {
    try {
      const { email, code } = req.body;

      if (!email || !code) {
        throw new MissingParameter();
      }
      if (!authService.validate("email", email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      var result = await authService.vertifyUser(email, code);
      if (result === 200) {
        return res.status(200).json({
          message: "User verified successfully"
        })
      }
      if (result === 400) {
        return res.status(400).json({
          message: "Invalid verification code"
        })
      }

      if (result === 404) {
        return res.status(404).json({
          message: "User not found"
        })
      }

      if (result === 408) {
        return res.status(408).json({
          message: "Ma het hieu luc"
        })
      }
    } catch (error: any) {
      console.log(error);
      const Err = new ErrorResponse(
        error.message as string,
        error.statusCode as number
      );

      return res.status(Err.statusCode).json({ message: Err.message });
    }

  }
}


const user = new User();
export default user;
