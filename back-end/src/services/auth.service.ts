import { compare, compareSync, genSaltSync, hash, hashSync } from "bcrypt";
import UserModel from "../models/User.model";
import { ErrorResponse, InvalidInput } from "../utils/errorResponse";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import TokenModel from "../models/Token.model";
import RefreshTokenModel from "../models/Token.model";

config();
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

    async authGoogle(email: string, username: string, image: string) {
        const user = await UserModel.findOne({ email: email });

        if (user) {
            return user;
        }
        const password: string = this.generateRandomString(10);
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        const newUser = await UserModel.create({
            email,
            username,
            image,
            password: hash,
        });

        return newUser;
    }
    async signIn(email: string, password: string) {
        const user = await UserModel.findOne({ email: email });
        console.log(email, password)
        
        if (!user) {
            throw new InvalidInput("Email not found");
        }
        console.log(user.email, user.password)
        // let isMatch = compareSync(password, user.password);

        if (password !== user.password) {
            throw new InvalidInput("Password not match");
        }

        return user;
    }

    validate(type: "email" | "password", value: string) {
        if (type === "email") {
            const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            console.log(type)
            console.log(emailRegex.test(value))
            return emailRegex.test(value);
        }
        if (type === "password") {
            const passwordRegex: RegExp =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
            console.log(type)
            console.log(passwordRegex.test(value))
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

    generateRandomString(length: number): string {
        const charset =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let randomString = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            randomString += charset[randomIndex];
        }
        return randomString;
    }
}

const auhtService = new AuthService();
export default auhtService;
