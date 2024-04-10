import jwt from "jsonwebtoken";

import { Response, Request } from "express";
import {
    ErrorResponse,
    ErrorResponseType,
    InvalidInput,
    MissingParameter,
} from "../utils/errorResponse";
import auhtService from "../services/auth.service";
import Logger from "../lib/logger";
import {
    IFailRes,
    ISignIn,
    ISignUp,
    ISuccessRes,
    IToken,
} from "../utils/auth.interface";
import { config } from "dotenv";
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
                !auhtService.validate("email", email) ||
                !auhtService.validate("password", password)
            ) {
                throw new InvalidInput();
            }

            const user = await auhtService.signUp(email, password, username);

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

            await auhtService.addTokens(refreshToken, user._id);

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
                !auhtService.validate("email", email) ||
                !auhtService.validate("password", password)
            ) {
                throw new InvalidInput(); // * return
            }

            const user = await auhtService.signIn(email, password);

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

            await auhtService.addTokens(refreshToken, user._id);

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

            const Token_id = await auhtService.removeToken(
                userId,
                refreshToken
            );

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
    async googleAuth(req: Request, res: Response) {
        const { code } = req.body;

        const client_id = process.env.CLIENT_ID as string;

        const client_secret = process.env.CLIENT_SECRET as string;

        const redirect_uri = "http://localhost:8080/api/v1/auth/google-auth";

        const grant_type = "authorization_code";

        fetch("https://oauth2.googleapis.com/token", {
            method: "POST",

            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },

            body: new URLSearchParams({
                code,

                client_id,

                client_secret,

                redirect_uri,

                grant_type,
            }),
        })
            .then((response) => response.json())

            .then((tokens) => {
                // Send the tokens back to the frontend, or store them securely and create a session
                console.log(tokens);

                res.json(tokens);
            })

            .catch((error) => {
                // Handle errors in the token exchange

                console.error("Token exchange error:", error);

                res.status(500).json({ error: "Internal Server Error" });
            });
    }
}

const user = new User();
export default user;
