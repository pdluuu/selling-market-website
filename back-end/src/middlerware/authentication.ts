import { Response, Request, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { IToken, JwtPayLoad } from "../utils/auth.interface";
import { config } from "dotenv";
import Logger from "../lib/logger";
config();

export function authenticateToken(
    req: Request<any, any, any>,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.status(401).json({
            message: "Un-verified",
        });
    console.log("Token: " + token);

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || "",
        (err: any, payload: JwtPayLoad | any) => {
            if (err) {
                console.log(err);
                return res.status(403).json({
                    message: "Un-verified",
                });
            }

            req.user = payload;
            req.body.userId = payload._id;

            next();
        }
    );
}
