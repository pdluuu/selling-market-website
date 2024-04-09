import { compare, compareSync, genSaltSync, hash, hashSync } from "bcrypt";
import UserModel from "../models/User.model";
import { ErrorResponse, InvalidInput } from "../utils/errorResponse";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import TokenModel from "../models/Token.model";
import RefreshTokenModel from "../models/Token.model";
import { log } from "console";

config();

const sentCodes: { [email: string]: { code: string | false, expiresAt: number } } = {};

class AuthService {
    async signUp(email: string, password: string, username: string) {
        if (
            (await this.isExistEmail(email)) ||
            (await this.isExistUsername(username))
        ) {
            throw new InvalidInput("Email already exists");
        }

        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);

        const newUser = await UserModel.create({
            email: email,
            password: hash,
            username: username,
        });

        return newUser;
    }
    async signIn(email: string, password: string) {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            throw new InvalidInput("Email not found");
        }

        let isMatch = compareSync(password, user.password);

        if (!isMatch) {
            throw new InvalidInput("Password not match");
        }

        return user;
    }

    validate(type: "email" | "password", value: string) {
        if (type === "email") {
            const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        }
        if (type === "password") {
            const passwordRegex: RegExp =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
            return passwordRegex.test(value);
        }
        return false;
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

    async addTokens(token: string, userId: string) {
        const refreshToken = await RefreshTokenModel.findOne({ userId });

        if (!refreshToken) {
            await RefreshTokenModel.create({ userId, refreshTokens: [token] });

            return;
        }
        refreshToken.refreshTokens.push(token);
        await refreshToken.save();
        return;
    }

    async removeToken(userId: string, refreshToken: string) {
        const Token = await RefreshTokenModel.findOne({ userId });

        console.log("da vao duoc log out");

        if (!Token) {
            throw new ErrorResponse("User had logged out!", 400);
        }
        let refreshTokens = Token.refreshTokens.filter(
            (token) => token !== refreshToken
        );

        Token.refreshTokens = refreshTokens;
        await Token.save();

        return Token._id;
    }

    async sendCode(email: string): Promise<string | false>{       
        const code = String(Math.floor(100000 + Math.random() * 900000));
        try {
            var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
              user: 'mailinhv534@gmail.com',
              pass: 'nrydytummnqecfpn'
            }
          });
          
          var mailOptions = {
            from: 'mailinhv534@gmail.com',
            to: email,
            subject: 'Sending Email to sendCode',
            text: code
          };
          
           await transporter.sendMail(mailOptions)
            console.log(code);
            const expiresAt = Date.now() + 3 * 60 * 1000;

            sentCodes[email] = { code: code, expiresAt: expiresAt };
            return code;
        } catch (error:any) {
            console.error(error);
            return false;
        }
          
    }

    async vertifyUser(email: string, code: string) {
        try {
            if (email in sentCodes) {
                // Tìm mã code trong mảng của email
                const userCodes = sentCodes[email];
                if(userCodes.code !== code){
                    return 400;
                }
                if(userCodes.expiresAt < Date.now()){
                    return 408;
                }
                return 200;
            }else{
                return 404;
            }
        } catch (error) {
            
        }
    }
}

const authService = new AuthService();
export default authService;
